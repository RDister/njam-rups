"use client";

import {
	Dispatch,
	FormEvent,
	memo,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import Image from "next/image";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import { AnimatePresence, motion } from "framer-motion";
import { useGameEnd, useGameGuess, useGameStart } from "@/api/game/hooks";
import classes from "./GuessingGameplaySection.module.scss";
import InputAutocomplete from "../Input/InputAutocomplete/InputAutocomplete";
import { MapGuess } from "../GameMap/GameMap";
import { usePathname, useSearchParams } from "next/navigation";
import { Routes } from "@/constants/routes";
import { GameFormat, GameMode } from "@/api/models/game/GameModel";
import CorrectAnswerModal from "../CorrectAnswerModal/CorrectAnswerModal";
import EndModal from "../EndModal/EndModal";

interface GuessingGameplaySectionProps {
	gameType: "country" | "city";
	setGuesses: Dispatch<SetStateAction<MapGuess[]>>;
	autocompleteOptions: string[];
}

interface GuessItem {
	name: string;
	isCorrect: boolean;
	timeTaken: number;
}

const GuessingGameplaySection = ({
	gameType,
	setGuesses,
	autocompleteOptions,
}: GuessingGameplaySectionProps) => {
	const [guessHistory, setGuessHistory] = useState<GuessItem[]>([]);
	const [sessionId, setSessionId] = useState<string | null>(null);
	const [imageUrl, setImageUrl] = useState("");
	const [currentGuess, setCurrentGuess] = useState("");
	const [correctAnswer, setCorrectAnswer] = useState("");
	const [score, setScore] = useState(0);

	const [isGameOver, setIsGameOver] = useState(false);

	const [currentGame, setCurrentGame] = useState<GameMode>();
	const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);

	const searchParams = useSearchParams();
	const gameModeParam = searchParams.get("mode") as GameFormat | null;

	const { mutate: startGame } = useGameStart();
	const { mutate: endGame } = useGameEnd();
	const { mutate: mutateMakeGuess } = useGameGuess();

	const pathname = usePathname();

	useEffect(() => {
		if (pathname.includes(Routes.GUESS_THE_COUNTRY)) {
			setCurrentGame("flags");
		} else if (pathname.includes(Routes.GUESS_THE_CAPITAL)) {
			setCurrentGame("capitals");
		}
	}, [pathname]);

	useEffect(() => {
		if (!currentGame) return;
		if (!gameModeParam) return;

		startGame(
			{ gameMode: currentGame, format: gameModeParam },
			{
				onSuccess: (data) => {
					setSessionId(data.sessionId);
					setImageUrl(`http://localhost:8081/${data.nextImageUrl}`);
					console.log(data);
				},
			}
		);

		return () => {
			if (sessionId) {
				endGame(sessionId);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentGame, gameModeParam]);

	const capitalizeFirstLetter = (word?: string) => {
		return String(word).charAt(0).toUpperCase() + String(word).slice(1);
	};

	const makeGuess = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log("Making guess:", currentGuess);

		if (!currentGuess || currentGuess.trim() === "") {
			console.log("Empty guess, not submitting");
			return;
		}

		mutateMakeGuess(
			{ sessionId: sessionId || "", guess: currentGuess },
			{
				onSuccess: (data) => {
					setCurrentGuess("");

					setScore(data.score);

					if (data.gameOver) {
						setIsGameOver(true);
						return;
					}

					if (data.correct) {
						const formattedWord = capitalizeFirstLetter(currentGuess);
						setCorrectAnswer(formattedWord);

						setGuessHistory([
							{
								name: formattedWord || "",
								isCorrect: true,
								timeTaken: Date.now(),
							},
							...guessHistory,
						]);
						setGuesses((prevGuesses) => [
							...prevGuesses,
							{
								lat: Number(data.answer.lat),
								lng: Number(data.answer.lon),
								isCorrect: true,
							},
						]);

						setIsAnswerModalOpen(true);
						setCurrentGuess("");
						setGuesses([]);
						setGuessHistory([]);
						setImageUrl(`http://localhost:8081/${data.nextImageUrl}`);
					} else {
						const formattedWord = capitalizeFirstLetter(currentGuess);
						setGuessHistory([
							{
								name: formattedWord || "",
								isCorrect: false,
								timeTaken: Date.now(),
							},
							...guessHistory,
						]);
						if (data.answer.lat == null) return;
						setGuesses((prevGuesses) => [
							...prevGuesses,
							{
								lat: Number(data.answer.lat),
								lng: Number(data.answer.lon),
								isCorrect: false,
							},
						]);
					}
				},
			}
		);
	};

	return (
		<div className={classes.componentWrapper}>
			<AnimatePresence>
				{isAnswerModalOpen && (
					<CorrectAnswerModal
						setIsAnswerModalOpen={setIsAnswerModalOpen}
						answer={correctAnswer}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{isGameOver && <EndModal score={score} maxScore={10} />}
			</AnimatePresence>
			<div className={classes.flagContainer}>
				<AnimatePresence mode="popLayout">
					{imageUrl && (
						<motion.div
							key={imageUrl}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className={classes.imageWrapper}
						>
							<Image src={imageUrl} alt="flag" className={classes.flag} fill />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<form className={classes.form} onSubmit={makeGuess} noValidate>
				<InputAutocomplete
					options={autocompleteOptions}
					expandHorizontaly
					placeholder={
						gameType === "country" ? "Enter country..." : "Enter city..."
					}
					name="currentGuess"
					id="currentGuess"
					value={currentGuess}
					onChange={(value) => setCurrentGuess(value)}
					required
				/>
				<Button type="submit">Enter</Button>
			</form>
			<div className={classes.guessHistoryWrapper}>
				<Typography variant="body-1-regular">Guess history</Typography>
				<div className={classes.guessHistoryContent}>
					{guessHistory.map((item) => {
						return (
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								key={item.name + item.timeTaken}
								layout
								className={`${classes.guess} ${
									item.isCorrect ? classes.correctGuess : classes.incorrectGuess
								}`}
							>
								{item.name}
							</motion.div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default memo(GuessingGameplaySection);
