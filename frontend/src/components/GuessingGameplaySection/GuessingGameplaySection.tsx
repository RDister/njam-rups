"use client";

import { memo, useState } from "react";
import Image from "next/image";
import albaniaFlag from "../../../public/GuessTheCountry/image.png";
import classes from "./GuessingGameplaySection.module.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";

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
  const [guessHistory, setGuessHistory] = useState<GuessItem[]>([]);

  const capitalizeFirstLetter = (word: string) => {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
  };

  const makeGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = formData.get("currentGuess")?.toString();
    e.currentTarget.reset();
    if (data?.toString().toLowerCase() === answer.toLowerCase()) {
      const formattedWord = capitalizeFirstLetter(data);
      setGuessHistory([
        { name: formattedWord || "", isCorrect: true },
        ...guessHistory,
      ]);
    } else {
      if (data) {
        const formattedWord = capitalizeFirstLetter(data);
        setGuessHistory([
          { name: formattedWord || "", isCorrect: false },
          ...guessHistory,
        ]);
      } else {
        console.error("This should never happen we dont handle it");
      }
    }
  };

  return (
    <div className={classes.componentWrapper}>
      <div className={classes.flagContainer}>
        <Image src={albaniaFlag} alt="flag" className={classes.flag} />
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
