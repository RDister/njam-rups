import { memo } from "react";
import { motion } from "framer-motion";
import classes from "./TooltipError.module.scss";

const Tooltip = ({ status }: { status: string }) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9, x: "-50%" }}
			animate={{ opacity: 1, scale: 1, x: "-50%" }}
			exit={{ opacity: 0, scale: 0.9, x: "-50%" }}
			className={classes.container}
		>
			{status}
		</motion.div>
	);
};

export default memo(Tooltip);
