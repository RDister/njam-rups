"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import classes from "./GuessTheLandmarkPage.module.scss";
import GuessTheLandmarkMap from "./components/GuessTheLandmarkMap/GuessTheLandmarkMap";
import Button from "@/components/Button/Button";
import Typography from "@/components/Typography/Typography";
import { motion } from "framer-motion";
import { useGameStart, useGameEnd, useSightsGameGuess } from "@/api/game/hooks";

const GuessTheLandmarkPage = () => {
	const [sessionId, setSessionId] = useState<string>("");

	const [imageUrl, setImageUrl] = useState("");
	const [nextImageUrl, setNextImageUrl] = useState("");

	const [currentGuess, setCurrentGuess] =
		useState<google.maps.LatLngLiteral | null>(null);
	const [goalPosition, setGoalPosition] =
		useState<google.maps.LatLngLiteral | null>(null);
	const [distanceFromGoal, setDistanceFromGoal] = useState<number | null>(null);
	const [score, setScore] = useState<number | null>(null);
	const [scores, setScores] = useState<number[]>([]);

	const { mutate: startGame } = useGameStart();
	const { mutate: endGame } = useGameEnd();
	const { mutate: mutateMakeGuess } = useSightsGameGuess();

	useEffect(() => {
		startGame(
			{ gameMode: "sights", format: "classic" },
			{
				onSuccess: (data) => {
					setSessionId(data.sessionId);
					setImageUrl(`http://localhost:8081/${data.nextImageUrl}`);
				},
			}
		);

		return () => {
			if (sessionId) {
				endGame(sessionId);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const makeGuess = (guess: google.maps.LatLngLiteral) => {
		console.log("Making guess:", guess);

		mutateMakeGuess(
			{
				sessionId: sessionId || "",
				lat: guess.lat,
				lon: guess.lng,
			},
			{
				onSuccess: (data) => {
					setGoalPosition({ lat: data.answer.lat, lng: data.answer.lon });
					setDistanceFromGoal(data.distanceKm);
					setScore(data.pointsEarned);
					setScores((prevScores) => [...prevScores, data.pointsEarned]);
					setNextImageUrl(`http://localhost:8081/${data.nextImageUrl}`);
				},
			}
		);
	};

	const nextRound = () => {
		setCurrentGuess(null);
		setGoalPosition(null);
		setDistanceFromGoal(null);
		setScore(null);
		setImageUrl(nextImageUrl);
	};

	return (
		<main className={classes.pageWrapper}>
			<section className={classes.sightSection}>
				<div className={classes.imageWrapper}>
					{imageUrl && (
						<Image
							src={imageUrl}
							className={classes.sightImage}
							alt={"sight image"}
							fill
						/>
					)}
				</div>
			</section>
			<section className={classes.right}>
				<section className={classes.mapSection}>
					<GuessTheLandmarkMap
						guessPosition={currentGuess}
						onGuessPositionChange={setCurrentGuess}
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
							<Typography>{distanceFromGoal?.toFixed(2)} km</Typography>
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
							goalPosition ? nextRound() : makeGuess(currentGuess!)
						}
						disabled={currentGuess == null}
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
							<Typography>{score}</Typography>
							<Typography>of 1000 points</Typography>
						</motion.div>
					)}
				</section>
			</section>
		</main>
	);
};

export default memo(GuessTheLandmarkPage);
