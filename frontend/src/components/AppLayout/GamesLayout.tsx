import { memo, ReactNode } from "react";
import classes from "./GamesLayout.module.scss";
import Header from "../Header/Header";

interface GamesLayoutProps {
  children: ReactNode;
}

const GamesLayout = ({ children }: GamesLayoutProps) => {
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.body}>{children}</div>
    </div>
  );
};

export default memo(GamesLayout);
