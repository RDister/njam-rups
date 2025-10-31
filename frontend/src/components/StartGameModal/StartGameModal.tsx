"use client";

import { memo, useState } from "react";
import { motion } from "framer-motion";
import classes from "./StartGameModal.module.scss";
import Link from "next/link";
import { useModalState } from "@/store/startGameModal";
import sadParrot from "../../../public/images/sadParrot.png";
import mediumParrot from "../../../public/images/mediumParrot.png";
import happyParrot from "../../../public/images/happyParrot.png";
import Image from "next/image";

const StartGameModal = () => {
  const gamemode = useModalState((state) => state.currentGame);
  const [testScore, setTestScore] = useState<number>(1);

  const startGamePractice = () => {
    console.log("Practice");
  };

  const startGameTest = () => {
    console.log("Test");
  };

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
          <motion.div
            className={classes.cardWrapper}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <div className={classes.score}>{testScore}/10</div>
            {0 <= testScore && testScore < 4 ? (
              <Image src={sadParrot} alt="" className={classes.image} />
            ) : 4 <= testScore && testScore < 8 ? (
              <Image src={mediumParrot} alt="" className={classes.image} />
            ) : (
              <Image src={happyParrot} alt="" className={classes.image} />
            )}
          </motion.div>
        </Link>
        <div className={classes.cardWrapper}>Section 2</div>
      </div>
    </motion.div>
  );
};

export default memo(StartGameModal);
