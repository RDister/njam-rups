import { memo } from "react";
import classes from "./GuessTheLandmarkPage.module.scss";

const GuessTheLandmarkPage = () => {
  return (
    <main className={classes.pageWrapper}>
      <section className={classes.sigthSection}>Eifel tower</section>
      <section className={classes.mapSection}>France</section>
    </main>
  );
};

export default memo(GuessTheLandmarkPage);
