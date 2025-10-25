import { memo } from "react";
import Image from "next/image";
import albaniaFlag from "../../../public/GuessTheCountry/albania.png";
import classes from "./GuessTheCountry.module.scss";

const GuessTheCountryPage = () => {
  return (
    <main className={classes.pageWrapper}>
      <div className={classes.contentWrapper}>
        <section className={classes.flagSection}>
          <Image src={albaniaFlag} alt="" width={408} height={294} />
        </section>
        <section className={classes.mapSection}></section>
      </div>
    </main>
  );
};

export default memo(GuessTheCountryPage);
