import { Dispatch, memo, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import classes from "./CorrectAnswerModal.module.scss";

interface CorrectAnswerModalProps {
	setIsAnswerModalOpen: Dispatch<SetStateAction<boolean>>;
	answer: string;
}

const CorrectAnswerModal = ({
	setIsAnswerModalOpen,
	answer,
}: CorrectAnswerModalProps) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				setIsAnswerModalOpen(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [setIsAnswerModalOpen]);

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
				<section className={classes.content}>
					<Typography variant="heading-3">Correct!</Typography>
					<Typography variant="body-1-regular" align="center">
						Well done, you guessed correctly! The answer was:
					</Typography>
					<Typography
						variant="heading-5"
						align="center"
						as="span"
						className={classes.answer}
					>
						{answer}
					</Typography>
				</section>
				<Button
					fullWidth
					tabIndex={0}
					onClick={() => setIsAnswerModalOpen(false)}
				>
					Close
				</Button>
			</motion.div>
		</motion.div>
	);
};

export default memo(CorrectAnswerModal);
