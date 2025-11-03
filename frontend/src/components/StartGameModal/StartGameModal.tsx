"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import classes from "./StartGameModal.module.scss";
import { useModalState } from "@/store/startGameModal";
import GamemodeCard from "./components/GamemodeCard";
import Typography from "../Typography/Typography";

interface StartGameModalProps {
	toggleModal: () => void;
}

const StartGameModal = ({ toggleModal }: StartGameModalProps) => {
	const game = useModalState((state) => state.currentGame);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={classes.container}
			onClick={() => toggleModal()}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				className={classes.innerContainer}
				onClick={(e) => e.stopPropagation()}
			>
				<Typography variant="heading-5">Choose your gamemode</Typography>
				<div className={classes.gamemodeCards}>
					<GamemodeCard game={game} gamemode="classic" />
					<GamemodeCard game={game} gamemode="endless" />
				</div>
			</motion.div>
		</motion.div>
	);
};

export default memo(StartGameModal);
