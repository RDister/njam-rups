"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import classes from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const [currentGame, setCurrentGame] = useState<string>("..."); // good enough for now no need for global context

  useEffect(() => {
    const location = window.location.href;
    if (location.includes("guessTheCountry")) {
      setCurrentGame("Guess the country");
    } else if (location.includes("guessTheCapital")) {
      setCurrentGame("Guess the capital");
    } else if (location.includes("geoguesser")) {
      setCurrentGame("Geoguesser");
    }
  }, []);

  return (
    <div className={classes.headerWrapper}>
      <Link href="/" className={classes.homeWrapper}>
        <FontAwesomeIcon
          icon={faHouse}
          width={30}
          height={30}
          className={classes.home}
        />
      </Link>
      <p className={classes.currentGame}>{currentGame}</p>
      <p className={classes.njam}>NJAM</p>
    </div>
  );
};

export default memo(Header);
