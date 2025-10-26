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

type TypographyVariant =
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span"
  | "div";

type TypographyProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: TextVariant;
  ref?: Ref<HTMLParagraphElement>;
  align?: "left" | "center" | "right";
  color?: string;
  as?: TypographyVariant;
};

const Typography = (props: TypographyProps) => {
  const {
    className,
    children,
    ref,
    variant = "body-1",
    align = "left",
    color,
    as = "p",
  } = props;

  const Element = as;

  return (
    <Element
      ref={ref}
      className={classNames(classes[variant], className)}
      style={{
        ...(align ? { textAlign: align } : {}),
        ...(color ? { color: `var(--${color})` } : {}),
      }}
    >
      {children}
    </Element>
  );
};

export default memo(Typography);
