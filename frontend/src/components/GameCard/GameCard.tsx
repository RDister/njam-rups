import { memo } from "react";
import Image, { StaticImageData } from "next/image";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import Link from "next/link";
import { useStore } from "zustand";
import classes from "./GameCard.module.scss";
import { useModalState } from "@/store/startGameModal";

interface GameCardProps {
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  gamemode: "country" | "city" | "geoguesser";
  toggleModal: () => void;
}

const GameCard = ({
  title,
  description,
  imageUrl,
  gamemode,
  toggleModal,
}: GameCardProps) => {
  const setGameModal = useModalState((state) => state.setGameModal);

  const handleGameStart = () => {
    setGameModal(gamemode);
    toggleModal();
  };

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
      <Button fullWidth onClick={handleGameStart} className={classes.button}>
        Play now
      </Button>
    </div>
  );
};

export default memo(GameCard);
