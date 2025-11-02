"use client";

import GuessingGameplaySection from "@/components/GuessingGameplaySection/GuessingGameplaySection";
import { memo, useState } from "react";
import classes from "./GuessTheCapitalPage.module.scss";
import GameMap, { MapGuess } from "@/components/GameMap/GameMap";
import { AnimatePresence } from "framer-motion";
import EndModal from "@/components/EndModal/EndModal";
import { euCapitals } from "@/data/euCapitals";

const GuessTheCapitalPage = () => {
	const [isGameOver, setIsGameOver] = useState(false);

	const [guesses, setGuesses] = useState<MapGuess[]>([]);

	return (
		<main className={classes.pageWrapper}>
			<section className={classes.gameDisplay}>
				<GuessingGameplaySection
					gameType="city"
					setGuesses={setGuesses}
					autocompleteOptions={euCapitals.map((item) => item.capital)}
				/>
			</section>
			<section className={classes.mapSection}>
				<GameMap guesses={guesses} />
			</section>
			<AnimatePresence>{isGameOver && <EndModal />}</AnimatePresence>
		</main>
	);
};

export default memo(GuessTheCapitalPage);
