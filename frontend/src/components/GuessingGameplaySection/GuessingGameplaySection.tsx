"use client";

import { memo, useState } from "react";
import Image from "next/image";
import albaniaFlag from "../../../public/GuessTheCountry/image.png";
import classes from "./GuessingGameplaySection.module.scss";

interface GuessingGameplaySectionProps {
  gameType: "country" | "city";
  answer: string;
}

interface GuessItem {
  name: string;
  isCorrect: boolean;
}

const GuessingGameplaySection = ({
  gameType,
  answer,
}: GuessingGameplaySectionProps) => {
  const [guessHistory, setGuessHistory] = useState<GuessItem[]>([
    { name: "Albania", isCorrect: true },
    { name: "Slovenia", isCorrect: false },
    { name: "France", isCorrect: false },
    { name: "Austria", isCorrect: false },
    { name: "Italy", isCorrect: false },
    { name: "Italy", isCorrect: false },
    { name: "Italy", isCorrect: false },
    { name: "Italy", isCorrect: false },
    { name: "Italy", isCorrect: false },
    { name: "Italy", isCorrect: false },
    { name: "Italy", isCorrect: false },
    { name: "Italy", isCorrect: false },
  ]);

  return (
    <div className={classes.componentWrapper}>
      <div className={classes.flagContainer}>
        <Image src={albaniaFlag} alt="flag" className={classes.flag} fill />
      </div>
      <form className={classes.form}>
        {gameType === "country" ? (
          <input
            className={classes.countryInput}
            aria-label="Country name input field"
            placeholder="Enter country..."
          ></input>
        ) : (
          <input
            className={classes.countryInput}
            aria-label="Country name input field"
            placeholder="Enter citry..."
          ></input>
        )}
        <button type="submit" className={classes.submitBtn}>
          Enter
        </button>
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
