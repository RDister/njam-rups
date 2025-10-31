"use client";

import { memo } from "react";
import Image, { StaticImageData } from "next/image";
import albaniaFlag from "../../../public/GuessTheCountry/image.png";
import Button from "../Button/Button";
import Input from "../Input/Input";
import classes from "./GuessingGameplaySection.module.scss";

export interface GuessItem {
	name: string;
	isCorrect: boolean;
}

interface GuessingGameplaySectionProps {
	gameType: "country" | "city";
	answer?: string;
	guessHistory: GuessItem[];
	handleGuess: (isCorrectValue: boolean, guess: string) => void;
	image?: StaticImageData;
}

const GuessingGameplaySection = ({
	gameType,
	answer,
	guessHistory,
	handleGuess,
	image,
}: GuessingGameplaySectionProps) => {
	const makeGuess = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const data = formData.get("currentGuess")?.toString();
		e.currentTarget.reset();
		if (data?.toString().toLowerCase() === answer?.toLowerCase()) {
			if (data) {
				handleGuess(true, data);
			}
		} else {
			if (data) {
				handleGuess(false, data);
			} else {
				console.error("This should never happen we dont handle it");
			}
		}
	};

	return (
		<div className={classes.componentWrapper}>
			<div className={classes.flagContainer}>
				{image && <Image src={image} alt="flag" className={classes.flag} />}
			</div>
			<form className={classes.form} onSubmit={makeGuess}>
				<Input
					expandHorizontaly
					placeholder={
						gameType === "country" ? "Enter country..." : "Enter city..."
					}
					name="currentGuess"
					id="currentGuess"
					required
				></Input>
				<Button>Enter</Button>
			</form>
			<div className={classes.guessHistoryWrapper}>
				<p>Guess history</p>
				<div className={classes.guessHistoryContent}>
					{guessHistory.map((item, index) => {
						return (
							<div
								key={index}
								className={`${classes.guess} ${
									item.isCorrect ? classes.correctGuess : classes.incorrectGuess
								}`}
							>
								{item.name}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default memo(GuessingGameplaySection);
