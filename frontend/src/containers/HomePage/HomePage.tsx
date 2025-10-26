import { memo } from "react";
import Typography from "@/components/Typography/Typography";
import classes from "./HomePage.module.scss";
import Button from "@/components/Button/Button";

const HomePage = () => {
  return (
    <div className={classes.container}>
      <section className={classes.titleSection}>
        <Typography variant="heading-1" className={classes.title}>
          NJAM
        </Typography>
        <Typography variant="heading-3">Geography</Typography>
      </section>
      <section>
        <Button fullWidth>Test</Button>
      </section>
    </div>
  );
};

export default memo(HomePage);
