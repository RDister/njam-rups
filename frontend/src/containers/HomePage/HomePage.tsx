import { memo } from "react";
import Typography from "@/components/Typography/Typography";
import GameCard from "@/components/GameCard/GameCard";
import sloveniaFlag from "../../../public/images/slovenia-flag.png";
import maribor from "../../../public/images/maribor.jpg";
import eiffelTower from "../../../public/images/eiffel-tower.jpg";
import classes from "./HomePage.module.scss";

const HomePage = () => {
	return (
		<div className={classes.container}>
			<section className={classes.titleSection}>
				<Typography variant="heading-1" className={classes.title}>
					NJAM
				</Typography>
				<Typography variant="heading-3">Geography</Typography>
			</section>
			<section className={classes.cards}>
				<GameCard
					title="Guess the Flag"
					description="Test your knowledge on European countries flags! Recognize the flag and select the country it belongs to."
					imageUrl={sloveniaFlag}
					buttonHref="/games/guessTheCountry"
				/>
				<GameCard
					title="Guess the Capital City"
					description="Can you correctly identify what city belongs to which country? "
					imageUrl={maribor}
					buttonHref="/games/guessTheCapital"
				/>
				<GameCard
					title="Guess the Landmark"
					description="Can you correctly identify what landmark belongs to which city?"
					imageUrl={eiffelTower}
					buttonHref="/games/guessTheLandmark"
				/>
			</section>
		</div>
	);
};

export default memo(HomePage);
