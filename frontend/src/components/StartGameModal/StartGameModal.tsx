"use client";

import { memo, useState } from "react";
import { motion } from "framer-motion";
import classes from "./StartGameModal.module.scss";
import Link from "next/link";
import { useModalState } from "@/store/startGameModal";
import sadParrot from "../../../public/images/sadParrot.png";
import mediumParrot from "../../../public/images/mediumParrot.png";
import happyParrot from "../../../public/images/happyParrot.png";
import practiceParrot from "../../../public/images/practiceParrot.png";
import Image from "next/image";

interface StartGameModalProps {
	toggleModal: () => void;
}

const StartGameModal = ({ toggleModal }: StartGameModalProps) => {
	const gamemode = useModalState((state) => state.currentGame);
	// will be added once gameplay is done
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [testScore, setTestScore] = useState<number>(9);

	return (
		<>
			<div className={classes.overlay} onClick={() => toggleModal()}></div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className={classes.modalWrapper}
			>
				<div className={classes.modal}>
					<Link
						href={
							gamemode === "country"
								? "/games/guessTheCountry?test"
								: gamemode === "city"
								? "/games/guessTheCapital?test"
								: "/games/guessTheLandmark?test"
						}
						className={classes.cardWrapper}
					>
						<motion.div
							className={classes.cardWrapper}
							whileHover={{
								scale: 1.01,
								transition: { duration: 0.2 },
							}}
							whileTap={{ scale: 0.9 }}
						>
							<div className={classes.score}>{testScore}/10</div>
							{0 <= testScore && testScore < 4 ? (
								<Image src={sadParrot} alt="" className={classes.image} />
							) : 4 <= testScore && testScore < 8 ? (
								<Image src={mediumParrot} alt="" className={classes.image} />
							) : (
								<Image src={happyParrot} alt="" className={classes.image} />
							)}
						</motion.div>
					</Link>
					<Link
						href={
							gamemode === "country"
								? "/games/guessTheCountry?practice"
								: gamemode === "city"
								? "/games/guessTheCapital?practice"
								: "/games/guessTheLandmark?practice"
						}
						className={classes.cardWrapper}
					>
						<motion.div
							className={classes.cardWrapper}
							whileHover={{
								scale: 1.01,
								transition: { duration: 0.2 },
							}}
							whileTap={{ scale: 0.9 }}
						>
							<Image src={practiceParrot} alt="" className={classes.image2} />
						</motion.div>
					</Link>
				</div>
			</motion.div>
		</>
	);
};

export default memo(StartGameModal);
