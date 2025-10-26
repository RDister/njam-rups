import { memo } from "react";
import classes from "./GameCard.module.scss";
import Image, { StaticImageData } from "next/image";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";

interface GameCardProps {
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
}

const GameCard = ({ title, description, imageUrl }: GameCardProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.imageWrapper}>
        <Image src={imageUrl} alt={title} fill />
      </div>
      <Typography variant="subheading-1">{title}</Typography>
      <Typography
        variant="body-2-regular"
        color="--neutral-700"
        className={classes.description}
      >
        {description}
      </Typography>
      <Button fullWidth className={classes.button}>
        Play now
      </Button>
    </div>
  );
};

export default memo(GameCard);
