import { memo } from "react";
import classes from "./GuessTheCountry.module.scss";
import GuessingGameplaySection from "@/components/GuessingGameplaySection/GuessingGameplaySection";

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
