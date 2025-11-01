"use client";

import { memo, useState } from "react";
import Image from "next/image";
import albaniaFlag from "../../../public/GuessTheCountry/image.png";
import classes from "./GuessingGameplaySection.module.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Typography from "../Typography/Typography";
import { motion } from "framer-motion";

interface GuessingGameplaySectionProps {
	gameType: "country" | "city";
	answer: string;
}

interface GuessItem {
	name: string;
	isCorrect: boolean;
	timeTaken: number;
}

const GuessingGameplaySection = ({
	gameType,
	answer,
}: GuessingGameplaySectionProps) => {
	const [guessHistory, setGuessHistory] = useState<GuessItem[]>([]);

	const capitalizeFirstLetter = (word: string) => {
		return String(word).charAt(0).toUpperCase() + String(word).slice(1);
	};

	const makeGuess = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const data = formData.get("currentGuess")?.toString();
		e.currentTarget.reset();

		if (data?.toString().toLowerCase() === answer.toLowerCase()) {
			const formattedWord = capitalizeFirstLetter(data);
			setGuessHistory([
				{ name: formattedWord || "", isCorrect: true, timeTaken: Date.now() },
				...guessHistory,
			]);
		} else {
			if (data) {
				const formattedWord = capitalizeFirstLetter(data);
				setGuessHistory([
					{
						name: formattedWord || "",
						isCorrect: false,
						timeTaken: Date.now(),
					},
					...guessHistory,
				]);
			} else {
				console.log("This should never happen we dont handle it");
			}
		}
	};

	return (
		<div className={classes.componentWrapper}>
			<div className={classes.flagContainer}>
				<Image src={albaniaFlag} alt="flag" className={classes.flag} />
			</div>
			<form className={classes.form} onSubmit={makeGuess} noValidate>
				<Input
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
