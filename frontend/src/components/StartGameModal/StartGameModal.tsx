"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import classes from "./StartGameModal.module.scss";
import Link from "next/link";
import { useModalState } from "@/store/startGameModal";

const StartGameModal = () => {
  const gamemode = useModalState((state) => state.currentGame);

  return (
    <motion.div className={classes.modalWrapper}>
      <div className={classes.modal}>
        <Link
          href={
            gamemode === "country"
              ? "/games/guessTheCountry"
              : gamemode === "city"
              ? "/games/guessTheCapital"
              : "/games/guessTheLandmark"
          }
          className={classes.cardWrapper}
        >
          <div>{gamemode}</div>
        </Link>
        <div className={classes.cardWrapper}>Section 2</div>
      </div>
    </motion.div>
  );
};

export default memo(StartGameModal);
