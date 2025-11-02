"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import classes from "./GuessTheLandmarkPage.module.scss";
import GuessTheLandmarkMap from "./components/GuessTheLandmarkMap/GuessTheLandmarkMap";
import Button from "@/components/Button/Button";
import Typography from "@/components/Typography/Typography";
import { motion } from "framer-motion";

const GuessTheLandmarkPage = () => {
	const [sightImageUrl, setSightImageUrl] = useState<string>("");
	const [nextSightImageUrl, setNextSightImageUrl] = useState<string>("");

	const [guessPosition, setGuessPosition] =
		useState<google.maps.LatLngLiteral | null>(null);

	const [goalPosition, setGoalPosition] =
		useState<google.maps.LatLngLiteral | null>(null);
	const [distance, setDistance] = useState<number | null>(null);
	const [points, setPoints] = useState<number | null>(null);

	const initGame = () => {
		// Call API start game
		const response = {
			nextImageUrl: "public/guessTheCountry/albania.png",
		};
		//setSightImageUrl(response.nextImageUrl);
	};

	const sendGuess = (guess: google.maps.LatLngLiteral) => {
		// API CALL

		const response = {
			distanceKm: 50.32,
			score: 831,
			answer: { lat: 48.858093, lon: 2.294694 },
			nextImageUrl: "public/guessTheCountry/albania.png",
		};

		setDistance(response.distanceKm);
		setPoints(response.score);
		setGoalPosition({ lat: response.answer.lat, lng: response.answer.lon });
		//setNextSightImageUrl(response.nextImageUrl);
	};

	const nextRound = () => {
		setGuessPosition(null);
		setDistance(null);
		setPoints(null);
		setGoalPosition(null);
		setSightImageUrl(nextSightImageUrl);
	};

	useEffect(() => {
		initGame();
	}, []);

	return (
		<main className={classes.pageWrapper}>
			<section className={classes.sightSection}>
				{sightImageUrl && (
					<Image src={sightImageUrl} alt={"sight image"} fill />
				)}
			</section>
			<section className={classes.right}>
				<section className={classes.mapSection}>
					<GuessTheLandmarkMap
						guessPosition={guessPosition}
						onGuessPositionChange={setGuessPosition}
						disableGuessing={goalPosition != null}
						goalPosition={goalPosition}
					/>
				</section>
				<section className={classes.controlsSection}>
					{goalPosition && (
						<motion.div
							className={classes.distance}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Typography>{distance} km</Typography>
							<Typography>from target</Typography>
						</motion.div>
					)}
					<Button
						layout
						animate={{
							flex: 1,
						}}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className={classes.button}
						onClick={() =>
							goalPosition ? nextRound() : sendGuess(guessPosition!)
						}
						disabled={guessPosition == null}
					>
						{goalPosition ? "Next" : "Confirm guess"}
					</Button>
					{goalPosition && (
						<motion.div
							className={classes.points}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Typography>{points}</Typography>
							<Typography>of 1000 points</Typography>
						</motion.div>
					)}
				</section>
			</section>
		</main>
	);
};

export default memo(GuessTheLandmarkPage);
