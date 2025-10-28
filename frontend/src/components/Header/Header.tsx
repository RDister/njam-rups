import { memo } from "react";
import classes from "./Header.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <div className={classes.headerWrapper}>
      <Link href="/" className={classes.hamburger}>
        🏠
      </Link>
      <p className={classes.currentGame}>CurrentGame</p>
      <p className={classes.njam}>NJAM</p>
    </div>
  );
};

export default memo(Header);
