import { memo } from "react";
import classes from "./GuessTheLandmarkPage.module.scss";
import GameMap from "../../components/GameMap/GameMap"

const GuessTheLandmarkPage = () => {
  return (
    <main className={classes.pageWrapper}>
      <section className={classes.sigthSection}>Eifel tower</section>
      <section className={classes.mapSection}><GameMap guesses={[]} /></section>
    </main>
  );
};

export default memo(GuessTheLandmarkPage);
