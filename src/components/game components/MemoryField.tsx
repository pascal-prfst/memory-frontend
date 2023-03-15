import { useState, useEffect } from "react";

import { memoryData, MemoryData } from "../../data/memory-data";
import MemoryCard from "./MemoryCard";
import classes from "./MemoryField.module.css";
import { createGameField, checkCardsForMatch } from "../../utils/helper-functions";

type FieldProps = {
  fieldSize: string;
  checkForFinishedGame: (memoryData: MemoryData[]) => void;
};

function MemoryField({ fieldSize, checkForFinishedGame }: FieldProps) {
  const [memoryCards, setMemoryCards] = useState<MemoryData[]>([]);
  const [failedMatch, setFailedMatch] = useState(false);
  const [lastSelectedCard, setLastSelectedCard] = useState("");

  const stylesForSmallField = {
    gridTemplateColumns: fieldSize === "small" ? "auto auto auto" : "auto auto auto auto auto auto",
  };

  // after game start memory field will be created
  useEffect(() => {
    const memoryCards = createGameField(fieldSize);
    setMemoryCards(memoryCards);
    console.log("Test");
  }, [fieldSize]);

  useEffect(() => {
    const filteredSelected = memoryCards.filter(card => card.selected);

    if (filteredSelected.length === 2) {
      const equalBoxes = checkCardsForMatch(filteredSelected);

      // picked cards are equal
      if (equalBoxes) {
        setTimeout(() => {
          setMemoryCards(prevCards =>
            prevCards.map(card => {
              return card.selected ? { ...card, match: true, selected: false } : card;
            })
          );
        }, 300);
      }
      // picked cards are not equal
    } else if (filteredSelected.length === 3) {
      console.log(lastSelectedCard);
      setFailedMatch(true);
      setMemoryCards(prevCards =>
        prevCards.map(card => {
          return card.id === lastSelectedCard ? { ...card } : { ...card, selected: false };
        })
      );
    }
  }, [memoryCards]);

  // check if game is finished
  useEffect(() => {
    checkForFinishedGame(memoryCards);
  }, [memoryCards]);

  function cardClickHandler(id: string) {
    setFailedMatch(false);
    setLastSelectedCard(id);
    setMemoryCards(prevCards =>
      prevCards.map(card => {
        return card.id === id ? { ...card, selected: !card.selected } : { ...card };
      })
    );
  }

  return (
    <ul style={stylesForSmallField} className={classes.playfield_grid}>
      {memoryCards.map((data, index) => {
        return (
          <MemoryCard
            key={index}
            id={data.id}
            image={data.image}
            title={data.title}
            clickHandler={cardClickHandler}
            match={data.match}
            failedMatch={failedMatch}
            selected={data.selected}
          />
        );
      })}
    </ul>
  );
}

export default MemoryField;
