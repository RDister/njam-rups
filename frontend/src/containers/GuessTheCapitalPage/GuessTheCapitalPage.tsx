"use client";

import GuessingGameplaySection from "@/components/GuessingGameplaySection/GuessingGameplaySection";
import { memo, useState } from "react";
import classes from "./GuessTheCapitalPage.module.scss";
import GameMap, { MapGuess } from "@/components/GameMap/GameMap";
import { euCapitals } from "@/data/euCapitals";

const GuessTheCapitalPage = () => {
	const [guesses, setGuesses] = useState<MapGuess[]>([]);
	const [questionNumber, setQuestionNumber] = useState(1);

	return (
		<main className={classes.pageWrapper}>
			<section className={classes.gameDisplay}>
				<GuessingGameplaySection
					gameType="city"
					setGuesses={setGuesses}
					autocompleteOptions={euCapitals.map((item) => item.capital)}
					setQuestionNumber={setQuestionNumber}
				/>
			</section>
			<section className={classes.mapSection}>
				<GameMap guesses={guesses} questionNumber={questionNumber} />
			</section>
		</main>
	);
};

export default memo(GuessTheCapitalPage);
