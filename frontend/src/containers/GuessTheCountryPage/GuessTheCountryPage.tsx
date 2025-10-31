"use client";

import { memo, useState } from "react";
import GuessingGameplaySection from "@/components/GuessingGameplaySection/GuessingGameplaySection";
import classes from "./GuessTheCountryPage.module.scss";

export interface GuessItem {
	name: string;
	isCorrect: boolean;
}

const GuessTheCountryPage = () => {
	const [guessHistory, setGuessHistory] = useState<GuessItem[]>([]);

	const capitalizeFirstLetter = (word: string) => {
		return String(word).charAt(0).toUpperCase() + String(word).slice(1);
	};

	const handleGuess = (isCorrectValue: boolean, guess: string) => {
		const formattedWord = capitalizeFirstLetter(guess);
		setGuessHistory([
			{ name: formattedWord || "", isCorrect: isCorrectValue },
			...guessHistory,
		]);
	};

	return (
		<main className={classes.pageWrapper}>
			<section className={classes.gameDisplay}>
				<GuessingGameplaySection
					gameType="country"
					answer="albania"
					guessHistory={guessHistory}
					handleGuess={handleGuess}
				/>
			</section>
			<section className={classes.mapSection}>right</section>
		</main>
	);
};

export default memo(GuessTheCountryPage);
