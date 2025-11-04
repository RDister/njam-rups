import { memo } from "react";
import classes from "./GameCounter.module.scss";
import Typography from "../Typography/Typography";
import { AnimatePresence, motion } from "framer-motion";

interface GameCounterProps {
	count: number;
}

const GameCounter = ({ count }: GameCounterProps) => {
	return (
		<div className={classes.container}>
			<Typography as="span" variant="subheading-1" color="--neutral-500">
				#
			</Typography>
			<AnimatePresence mode="popLayout" initial={false}>
				<motion.div
					key={count}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }}
					transition={{ duration: 0.2 }}
				>
					<Typography as="span" variant="heading-6">
						{count}
					</Typography>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default memo(GameCounter);
