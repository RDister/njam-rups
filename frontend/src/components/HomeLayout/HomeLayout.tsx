import { memo, ReactNode } from "react";
import classes from "./HomeLayout.module.scss";
import Typography from "../Typography/Typography";

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className={classes.container}>
      {children}
      <div className={classes.footer}>
        <Typography variant="body-2-regular" color="--neutral-700">
          &copy; NJAM inc.&reg; 2025 - vse pravice pridržane&trade;
        </Typography>
      </div>
    </div>
  );
};

export default memo(HomeLayout);
