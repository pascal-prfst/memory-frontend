import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

import classes from "./MemoryCard.module.css";

interface MemoryCardProps {
  id: string;
  title: string;
  image: string;
  match: boolean;
  clickHandler: (id: string) => void;
  failedMatch: boolean;
  selected: boolean;
  active: boolean;
}

function MemoryCard({
  id,
  title,
  image,
  clickHandler,
  match,
  failedMatch,
  selected,
  active,
}: MemoryCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleCardFlip() {
    if (active) {
      setIsFlipped(true);
    }
  }

  useEffect(() => {
    if (failedMatch && !selected) {
      setIsFlipped(false);
    }
  }, [failedMatch]);

  if (match) {
    return (
      <li className={`${classes.image_container} ${classes.card_matched}`}>
        <img src={image} alt={title} />
      </li>
    );
  }

  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <li
        onClick={() => {
          clickHandler(id), handleCardFlip();
        }}
        className={classes.image_container}>
        <img src="/images/card-back.png" alt="memory card backside" />
      </li>
      <li
        onClick={() => {
          clickHandler(id), handleCardFlip();
        }}
        className={classes.image_container}>
        <img src={image} alt={title} />
      </li>
    </ReactCardFlip>
  );
}

export default MemoryCard;
