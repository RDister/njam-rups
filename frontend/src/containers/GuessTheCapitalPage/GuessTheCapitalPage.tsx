import GuessingGameplaySection from "@/components/GuessingGameplaySection/GuessingGameplaySection";
import { memo } from "react";
import classes from "./GuessTheCapitalPage.module.scss";
import GameMap from "@/components/GameMap/GameMap";

const GuessTheCapitalPage = () => {
	return (
		<main className={classes.pageWrapper}>
			<section className={classes.gameDisplay}>
				<GuessingGameplaySection gameType="city" answer="Paris" />
			</section>
			<section className={classes.mapSection}>
				<GameMap guesses={[]} />
			</section>
		</main>
	);
};

export default memo(GuessTheCapitalPage);
