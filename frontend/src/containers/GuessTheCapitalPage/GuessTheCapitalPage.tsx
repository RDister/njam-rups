"use client";

import GuessingGameplaySection from "@/components/GuessingGameplaySection/GuessingGameplaySection";
import { memo, useState } from "react";
import classes from "./GuessTheCapitalPage.module.scss";
import GameMap from "@/components/GameMap/GameMap";
import { AnimatePresence } from "framer-motion";
import EndModal from "@/components/EndModal/EndModal";

const GuessTheCapitalPage = () => {
	const [isGameOver, setIsGameOver] = useState(true);

	return (
		<main className={classes.pageWrapper}>
			<section className={classes.gameDisplay}>
				<GuessingGameplaySection gameType="city" answer="Paris" />
			</section>
			<section className={classes.mapSection}>
				<GameMap guesses={[]} />
			</section>
			<AnimatePresence>{isGameOver && <EndModal />}</AnimatePresence>
		</main>
	);
};

export default memo(GuessTheCapitalPage);
