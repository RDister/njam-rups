import { memo, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import sadParrot from "../../../public/images/parrot_sad.png";
import mediumParrot from "../../../public/images/parrot_medium.png";
import happyParrot from "../../../public/images/parrot_happy.png";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import Link from "next/link";
import { Routes } from "@/constants/routes";
import Image from "next/image";
import classes from "./EndModal.module.scss";
import colors from "@/styles/variables";

interface EndModalProps {
	score: number;
	maxScore: number;
}

const EndModal = ({ score, maxScore }: EndModalProps) => {
	const [animatedScore, setAnimatedScore] = useState(0);

	useEffect(() => {
		setAnimatedScore(score);
	}, [score]);

	const progressBarColor = useMemo(() => {
		if (score < maxScore * 0.4) {
			return colors.error02;
		} else if (score < maxScore * 0.8) {
			return colors.mediumScore01;
		} else {
			return colors.success02;
		}
	}, [maxScore, score]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={classes.container}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				className={classes.innerContainer}
			>
				<Typography variant="heading-4">Score</Typography>

				{0 <= score && score < maxScore * 0.4 ? (
					<Typography variant="subheading-2" align="center">
						Don&apos;t be discouraged, you can do better!
					</Typography>
				) : maxScore * 0.4 <= score && score < maxScore * 0.8 ? (
					<Typography variant="subheading-2" align="center">
						Great job, you&apos;re getting there!
					</Typography>
				) : (
					<Typography variant="subheading-2" align="center">
						Keep up the amazing work!
					</Typography>
				)}
				<div className={classes.progressbar}>
					<CircularProgressbar
						value={Math.round((animatedScore / maxScore) * 100)}
						text={`${Math.round((animatedScore / maxScore) * 100)}%`}
						circleRatio={0.6}
						styles={buildStyles({
							rotation: 0.7,
							trailColor: "#E4E4E7",
							pathColor: progressBarColor,
							textSize: "20px",
							textColor: "#000000",
							pathTransitionDuration: 1,
						})}
					></CircularProgressbar>
				</div>
				<Typography
					variant="body-2-regular"
					align="center"
					color="--neutral-600"
					className={classes.resultText}
				>
					You scored {score} out of {maxScore} correct answers.
				</Typography>
				<Link href={Routes.HOME}>
					<Button fullWidth>Return to Homepage</Button>
				</Link>
				{0 <= score && score < maxScore * 0.4 ? (
					<Image src={sadParrot} alt="Sad Parrot" className={classes.image} />
				) : maxScore * 0.4 <= score && score < maxScore * 0.8 ? (
					<Image
						src={mediumParrot}
						alt="Medium Parrot"
						className={classes.image}
					/>
				) : (
					<Image
						src={happyParrot}
						alt="Happy Parrot"
						className={classes.image}
					/>
				)}
			</motion.div>
		</motion.div>
	);
};

export default memo(EndModal);
