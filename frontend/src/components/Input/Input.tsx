import { memo, InputHTMLAttributes, Ref } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import Typography from "../Typography/Typography";
import classes from "./Input.module.scss";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  expandHorizontaly?: boolean;
  ref?: Ref<HTMLInputElement>;
  status?: string;
  error?: boolean;
  sufixAction?: InputFieldAction;
};

export type InputFieldAction = {
  icon: IconDefinition;
  onClick: () => void;
};

const Input = (props: InputProps) => {
  const {
    className,
    label,
    expandHorizontaly = false,
    status,
    error,
    sufixAction,
    ...restProps
  } = props;

  return (
    <div
      className={classNames(classes.container, {
        [classes.expanded]: expandHorizontaly,
      })}
    >
      {label && (
        <Typography variant="body-2-regular" className={classes.label}>
          {label}
        </Typography>
      )}
      <div className={classes.inputWrapper}>
        <input
          className={classNames(
            classes.input,
            { [classes.error]: error },
            { [classes.withSufixAction]: sufixAction },
            className
          )}
          {...restProps}
        />
        {sufixAction && (
          <motion.button
            type="button"
            className={classes.sufixActionButton}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={sufixAction.onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon
              className={classes.sufixActionIcon}
              icon={sufixAction.icon}
            />
          </motion.button>
        )}
      </div>
      <AnimatePresence>
        {status && (
          <motion.span
            className={classes.status}
            initial={{ opacity: 0, height: 0, marginTop: -4 }}
            animate={{ opacity: 1, height: "auto", marginTop: 4 }}
            exit={{ opacity: 0, height: 0, marginTop: -4 }}
          >
            <FontAwesomeIcon icon={faCircleExclamation} />
            <Typography variant="body-2-regular">{status}</Typography>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(Input);
