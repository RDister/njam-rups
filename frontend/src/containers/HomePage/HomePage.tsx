import { memo } from "react";
import classes from "./HomePage.module.scss";
import Typography from "@/components/Typography/Typography";

const HomePage = () => {
  return (
    <div className={classes.container}>
      <section className={classes.titleSection}>
        <Typography variant="heading-1">NJAM</Typography>
        <Typography variant="heading-2">Geography</Typography>
      </section>
    </div>
  );
};

export default memo(HomePage);
