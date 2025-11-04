"use client";

import { memo, useState } from "react";
import GuessingGameplaySection from "@/components/GuessingGameplaySection/GuessingGameplaySection";
import { europeanCountries } from "@/data/europeanCountries";
import classes from "./GuessTheCountryPage.module.scss";
import GameMap, { MapGuess } from "@/components/GameMap/GameMap";

const GuessTheCountryPage = () => {
	const [guesses, setGuesses] = useState<MapGuess[]>([]);
	const [questionNumber, setQuestionNumber] = useState(1);

	return (
		<main className={classes.pageWrapper}>
			<section className={classes.gameDisplay}>
				<GuessingGameplaySection
					gameType="country"
					setGuesses={setGuesses}
					setQuestionNumber={setQuestionNumber}
					autocompleteOptions={europeanCountries.map((item) => item.name)}
				/>
			</section>
			<section className={classes.mapSection}>
				<GameMap guesses={guesses} questionNumber={questionNumber} />
			</section>
		</main>
	);
};

export default memo(GuessTheCountryPage);
