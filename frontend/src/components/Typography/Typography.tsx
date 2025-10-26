import { HTMLAttributes, ReactNode, Ref, memo } from "react";
import classNames from "classnames";
import classes from "./Typography.module.scss";

type TextVariant =
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "heading-4-regular"
  | "subheading-1"
  | "subheading-2"
  | "body-1"
  | "body-1-regular"
  | "body-2"
  | "body-2-regular";

type TypographyProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: TextVariant;
  ref?: Ref<HTMLParagraphElement>;
  align?: "left" | "center" | "right";
  color?: string;
};

const Typography = (props: TypographyProps) => {
  const {
    className,
    children,
    ref,
    variant = "body-1",
    align = "left",
    color,
  } = props;

  return (
    <p
      ref={ref}
      className={classNames(classes[variant], className)}
      style={{
        ...(align ? { textAlign: align } : {}),
        ...(color ? { color: `var(--${color})` } : {}),
      }}
    >
      {children}
    </p>
  );
};

export default memo(Typography);
