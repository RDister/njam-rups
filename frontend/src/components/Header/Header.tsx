"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import classes from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { Routes } from "@/constants/routes";
import Typography from "../Typography/Typography";
import { motion } from "framer-motion";

const Header = () => {
	const [currentGame, setCurrentGame] = useState<string>("...");
	const pathname = usePathname();

	useEffect(() => {
		if (pathname.includes(Routes.GUESS_THE_COUNTRY)) {
			setCurrentGame("Guess the Country");
		} else if (pathname.includes(Routes.GUESS_THE_CAPITAL)) {
			setCurrentGame("Guess the Capital");
		} else if (pathname.includes(Routes.GUESS_THE_LANDMARK)) {
			setCurrentGame("Guess the Landmark");
		}
	}, [pathname]);

	return (
		<div className={classes.headerWrapper}>
			<Link href={Routes.HOME} className={classes.homeWrapper}>
				<motion.div
					whileHover={{ scale: 1.04 }}
					whileTap={{ scale: 0.96 }}
					className={classes.homeButton}
				>
					<FontAwesomeIcon
						icon={faHouse}
						width={30}
						height={30}
						className={classes.home}
					/>
				</motion.div>
			</Link>
			<Typography variant="heading-5">{currentGame}</Typography>
			<Typography variant="heading-5">NJAM</Typography>
		</div>
	);
};

export default memo(Header);
