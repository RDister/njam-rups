import { memo } from "react";
import classes from "./GamemodeCard.module.scss";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { GameType } from "@/store/startGameModal";
import Typography from "@/components/Typography/Typography";
import test from "../../../../public/images/test.png";
import earth from "../../../../public/images/earth.png";
import testGamemode from "../../../../public/images/test-gamemode.png";
import endlessGamemode from "../../../../public/images/endless-gamemode.png";
import Image from "next/image";

interface GamemodeCardProps {
	game: GameType;
	gamemode: "test" | "practice";
}

const GamemodeCard = ({ game, gamemode }: GamemodeCardProps) => {
	return (
		<div className={classes.container}>
			<div className={classes.iconWrapper}>
				<Image
					src={gamemode === "practice" ? earth : test}
					alt=""
					className={classes.icon}
					fill
				/>
			</div>
			<div className={classes.imageWrapper}>
				<Image
					src={gamemode === "practice" ? endlessGamemode : testGamemode}
					alt=""
					className={classes.image}
					fill
				/>
			</div>
			<div className={classes.description}>
				<Typography>
					{gamemode.charAt(0).toUpperCase() + gamemode.slice(1)}
				</Typography>
				<Typography className={classes.descriptionSecondary}>·</Typography>
				<Typography
					className={classes.descriptionSecondary}
					variant="body-1-regular"
				>
					{gamemode === "test" ? "10 questions" : "Endless"}
				</Typography>
			</div>
			<Link
				href={
					game === "country"
						? `/games/guessTheCountry?${gamemode}`
						: game === "city"
						? `/games/guessTheCapital?${gamemode}`
						: `/games/guessTheLandmark?${gamemode}`
				}
				className={classes.cardWrapper}
			>
				<Button fullWidth>Start {gamemode}</Button>
			</Link>
		</div>
	);
};

export default memo(GamemodeCard);
