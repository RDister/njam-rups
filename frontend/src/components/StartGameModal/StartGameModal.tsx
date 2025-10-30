"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import classes from "./StartGameModal.module.scss";
import Link from "next/link";

interface StartGameModalProps {
  gamemode: "country" | "city" | "landmark" | "";
}

const StartGameModal = ({ gamemode }: StartGameModalProps) => {
  return (
    <Link
      href={
        gamemode === "country"
          ? "/games/guessTheCountry"
          : gamemode === "city"
          ? "/games/guessTheCapital"
          : "/games/guessTheLandmark"
      }
      className={classes.button}
    >
      <motion.div className={classes.modalWrapper}>
        <div className={classes.modal}>
          <div className={classes.cardWrapper}>Section 1</div>
          <div className={classes.cardWrapper}>Section 2</div>
        </div>
      </motion.div>
    </Link>
  );
};

export default memo(StartGameModal);
