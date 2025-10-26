import { memo, ReactNode } from "react";
import classes from "./HomeLayout.module.scss";

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return <div className={classes.container}>{children}</div>;
};

export default memo(HomeLayout);
