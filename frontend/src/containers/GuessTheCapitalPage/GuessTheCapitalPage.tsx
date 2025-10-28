import GuessingGameplaySection from "@/components/GuessingGameplaySection/GuessingGameplaySection";
import { memo } from "react";
import classes from "./GuessTheCapitalPage.module.scss";

const GuessTheCapitalPage = () => {
  return (
    <main className={classes.pageWrapper}>
      <section className={classes.gameDisplay}>
        <GuessingGameplaySection gameType="city" answer="Paris" />
      </section>
      <section className={classes.mapSection}>right</section>
    </main>
  );
};

export default memo(GuessTheCapitalPage);
