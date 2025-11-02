import { ComponentProps, memo } from "react";
import classes from "./GoalMarker.module.scss";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

type GoalMarkerProps = ComponentProps<typeof AdvancedMarker>;

const GoalMarker = ({ className, ...props }: GoalMarkerProps) => {
	return (
		<AdvancedMarker
			{...props}
			className={classNames(classes.goalMarker, className)}
		>
			<FontAwesomeIcon className={classes.icon} icon={faFlag} />
		</AdvancedMarker>
	);
};

export default memo(GoalMarker);
