"use client";

import { memo, useState } from "react";
import GuessingGameplaySection from "@/components/GuessingGameplaySection/GuessingGameplaySection";
import { europeanCountries } from "@/data/europeanCountries";
import classes from "./GuessTheCountryPage.module.scss";
import GameMap, { MapGuess } from "@/components/GameMap/GameMap";
import { AnimatePresence } from "framer-motion";
import EndModal from "@/components/EndModal/EndModal";

const GuessTheCountryPage = () => {
	const [isGameOver, setIsGameOver] = useState(false);
	const [guesses, setGuesses] = useState<MapGuess[]>([]);

	return (
		<main className={classes.pageWrapper}>
			<section className={classes.gameDisplay}>
				<GuessingGameplaySection
					gameType="country"
					setGuesses={setGuesses}
					autocompleteOptions={europeanCountries.map((item) => item.name)}
				/>
			</section>
			<section className={classes.mapSection}>
				<GameMap guesses={guesses} />
			</section>
			<AnimatePresence>{isGameOver && <EndModal />}</AnimatePresence>
		</main>
	);
};

export default memo(GuessTheCountryPage);
