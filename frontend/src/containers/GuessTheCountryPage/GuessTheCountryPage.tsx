import { memo } from "react";
import GuessingGameplaySection from "@/components/GuessingGameplaySection/GuessingGameplaySection";
import classes from "./GuessTheCountryPage.module.scss";

const GuessTheCountryPage = () => {
  return (
    <main className={classes.pageWrapper}>
      <section className={classes.gameDisplay}>
        <GuessingGameplaySection gameType="country" answer="albania" />
      </section>
      <section className={classes.mapSection}>right</section>
    </main>
  );
};

export default memo(GuessTheCountryPage);
