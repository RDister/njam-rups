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
import { motion } from "framer-motion";
import { useGameEnd, useGameGuess, useGameStart } from "@/api/game/hooks";
import classes from "./GuessingGameplaySection.module.scss";
import InputAutocomplete from "../Input/InputAutocomplete/InputAutocomplete";
import { MapGuess } from "../GameMap/GameMap";
import { usePathname } from "next/navigation";
import { Routes } from "@/constants/routes";
import { GameMode } from "@/api/models/game/GameModel";

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

	const { mutate: startGame } = useGameStart();
	const { mutate: endGame } = useGameEnd();
	const { mutate: mutateMakeGuess } = useGameGuess();

	const [currentGame, setCurrentGame] = useState<GameMode>();
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

		startGame(
			{ gameMode: currentGame, format: "endless" },
			{
				onSuccess: (data) => {
					setSessionId(data.sessionId);
					setImageUrl(`http://localhost:8081/${data.nextImageUrl}`);
				},
			}
		);

		return () => {
			if (sessionId) {
				endGame(sessionId);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentGame]);

	const capitalizeFirstLetter = (word?: string) => {
		return String(word).charAt(0).toUpperCase() + String(word).slice(1);
	};

	const makeGuess = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const currentGuess = formData.get("currentGuess")?.toString();

		console.log("Making guess:", currentGuess);

		mutateMakeGuess(
			{ sessionId: sessionId || "", guess: currentGuess },
			{
				onSuccess: (data) => {
					if (data.correct) {
						const formattedWord = capitalizeFirstLetter(currentGuess);
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
								lat: Number(data.correctAnswer.lat),
								lng: Number(data.correctAnswer.lon),
								isCorrect: true,
							},
						]);
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
					}
				},
			}
		);
	};

	return (
		<div className={classes.componentWrapper}>
			<div className={classes.flagContainer}>
				{imageUrl && (
					<div className={classes.imageWrapper}>
						<Image src={imageUrl} alt="flag" className={classes.flag} fill />
					</div>
				)}
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
