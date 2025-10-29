import { memo } from "react";
import classes from "./GameCard.module.scss";
import Image, { StaticImageData } from "next/image";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import Link from "next/link";

interface GameCardProps {
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  gamemode: "country" | "city" | "geoguesser";
}

const GameCard = ({
  title,
  description,
  imageUrl,
  gamemode,
}: GameCardProps) => {
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
      <Link
        href={
          gamemode === "country"
            ? "/games/guessTheCountry"
            : gamemode === "city"
            ? "/games/guessTheCapital"
            : "/games/geoguesser"
        }
        className={classes.button}
      >
        <Button fullWidth>Play now</Button>
      </Link>
    </div>
  );
};

export default memo(GameCard);
