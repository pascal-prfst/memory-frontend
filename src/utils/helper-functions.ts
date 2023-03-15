import { memoryData, MemoryData } from "../data/memory-data";

export function checkCardsForMatch(array: MemoryData[]) {
  if (array[0].title === array[1].title) {
    return true;
  } else {
    return false;
  }
}

export function createGameField(fieldSize: string) {
  const simpleCards = fieldSize === "small" ? createSmallField() : createBigField();
  const copySimpleCards = structuredClone(simpleCards);

  const changedIdArray = copySimpleCards.map((card: MemoryData) => {
    return { ...card, id: (card.id += "copy") };
  });

  const duplicatedArray = [...simpleCards, ...changedIdArray];
  const sortedCards = sortCardsRandomly(duplicatedArray);

  return sortedCards;
}

function createSmallField() {
  const memoryCards = [...memoryData];
  const createdField = [];

  for (let i = 0; i < 6; i++) {
    const randomNum = Math.floor(Math.random() * 12);
    createdField.push(memoryCards[randomNum]);
    memoryCards.splice(randomNum, 1);
  }

  return createdField;
}

function createBigField() {
  const memoryCards = [...memoryData];
  const createdField = [];

  for (let i = 0; i < 12; i++) {
    const randomNum = Math.floor(Math.random() * 12);
    createdField.push(memoryCards[randomNum]);
    memoryCards.splice(randomNum, 1);
  }

  return createdField;
}

// sort the memory cards randomly
function sortCardsRandomly(memoryData: MemoryData[]) {
  for (let i = 0; i < 50; i++) {
    const randomNum = Math.floor(Math.random() * memoryData.length);
    const temp = memoryData[randomNum];
    memoryData[randomNum] = memoryData[0];
    memoryData[0] = temp;
  }

  return memoryData;
}

// convert second to readable time
export function convertSecondsToMinutes(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return `${minutes}:${seconds < 10 ? 0 + seconds.toString() : seconds} min`;
}
