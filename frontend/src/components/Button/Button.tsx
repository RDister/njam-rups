"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { HTMLMotionProps, motion } from "framer-motion";
import { ButtonHTMLAttributes, memo, ReactNode } from "react";
import classes from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  HTMLMotionProps<"button"> & {
    variant?: "primary" | "outlined";
    fullWidth?: boolean;
    leadingIcon?: IconDefinition | ReactNode;
    loading?: boolean;
  };

const Button = (props: ButtonProps) => {
  const {
    whileHover,
    whileTap,
    className,
    variant = "primary",
    fullWidth = false,
    leadingIcon,
    ...restProps
  } = props;

  return (
    <motion.button
      {...restProps}
      className={classNames(classes.container, className, classes[variant], {
        [classes.fullWidth]: fullWidth,
      })}
      {...(!restProps?.disabled && {
        whileHover: {
          scale: 1.02,
          ...(whileHover && typeof whileHover === "object"
            ? { ...whileHover }
            : {}),
        },
      })}
      whileTap={{
        scale: 0.94,
        ...(whileTap && typeof whileTap === "object" ? { ...whileTap } : {}),
      }}
    >
      <LeadingIcon leadingIcon={leadingIcon} />
      {restProps.children}
    </motion.button>
  );
};

const LeadingIcon = ({
  leadingIcon,
}: {
  leadingIcon?: IconDefinition | ReactNode;
}) => {
  if (!leadingIcon) return null;

  if (typeof leadingIcon === "object" && "iconName" in leadingIcon) {
    return <FontAwesomeIcon icon={leadingIcon} />;
  }

  return leadingIcon;
};

export default memo(Button);
