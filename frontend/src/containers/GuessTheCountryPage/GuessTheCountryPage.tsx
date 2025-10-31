"use client";

import { memo, useEffect, useState } from "react";
import GuessingGameplaySection, {
	GuessItem,
} from "@/components/GuessingGameplaySection/GuessingGameplaySection";
import { Country, europeanCountries } from "@/data/europeanCountries";
import classes from "./GuessTheCountryPage.module.scss";

const GuessTheCountryPage = () => {
	const [guessHistory, setGuessHistory] = useState<GuessItem[]>([]);
	const [currentCountry, setCurrentCountry] = useState<Country>();

	const capitalizeFirstLetter = (word: string) => {
		return String(word).charAt(0).toUpperCase() + String(word).slice(1);
	};

	const handleGuess = (isCorrectValue: boolean, guess: string) => {
		const formattedWord = capitalizeFirstLetter(guess);
		setGuessHistory([
			{ name: formattedWord || "", isCorrect: isCorrectValue },
			...guessHistory,
		]);
		if (formattedWord === currentCountry?.name) {
			getGuess();
			setGuessHistory([]);
		}
	};

	const getGuess = () => {
		const randomIndex = Math.floor(Math.random() * europeanCountries.length);
		setCurrentCountry(europeanCountries[randomIndex]);
	};

	useEffect(() => {
		getGuess();
	}, []);

	return (
		<main className={classes.pageWrapper}>
			<section className={classes.gameDisplay}>
				<GuessingGameplaySection
					gameType="country"
					answer={currentCountry?.name}
					image={currentCountry?.image}
					guessHistory={guessHistory}
					handleGuess={handleGuess}
				/>
			</section>
			<section className={classes.mapSection}>right</section>
		</main>
	);
};

export default memo(GuessTheCountryPage);
