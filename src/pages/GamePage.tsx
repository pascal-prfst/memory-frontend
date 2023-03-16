import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";

import classes from "./GamePage.module.css";
import MemoryField from "../components/game components/MemoryField";
import GameTimer from "../components/game components/GameTimer";
import Button from "../components/UIElements/Button";
import Overlay from "../components/UIElements/Overlay";
import Modal from "../components/UIElements/Modal";
import { MemoryData } from "../data/memory-data";

function GamePage() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [gameIsActive, setGameIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [time, setTimer] = useState(0);
  const [fieldSize, setFieldSize] = useState("");

  const navigate = useNavigate();

  // detect window innerWidth and change fieldSize
  useEffect(() => {
    if (!gameIsActive) {
      window.addEventListener("resize", () => {
        setScreenWidth(window.innerWidth);
      });

      if (screenWidth < 800) {
        setFieldSize("small");
      } else if (screenWidth > 801) {
        setFieldSize("big");
      }
    }
  }, [screenWidth]);

  // Timer Logic
  useEffect(() => {
    if (gameIsActive) {
      setTimeout(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
    }
  }, [gameIsActive, time]);

  function startOrStopGame() {
    if (gameIsActive) {
      navigate(0);
    }
    setGameIsActive(prev => !prev);
    setTimer(0);
  }

  function checkForFinishedGame(memoryCards: MemoryData[]) {
    if (memoryCards.length !== 0) {
      const isGameFinished = memoryCards.every(card => card.match === true);
      if (isGameFinished) {
        setGameIsActive(false);
        setIsModalOpen(true);
      }
    }
  }

  function closeModalHandler() {
    setIsModalOpen(false);
    setTimer(0);
    navigate(0);
  }

  function changeToSmallField() {
    setFieldSize("small");
  }

  function changeToBigField() {
    setFieldSize("big");
  }

  return (
    <>
      {isModalOpen &&
        time > 0 &&
        createPortal(
          <Overlay closeModal={closeModalHandler} />,
          document.getElementById("overlay")!
        )}
      {isModalOpen &&
        time > 0 &&
        createPortal(
          <Modal closeModal={closeModalHandler} time={time} fieldSize={fieldSize} />,
          document.getElementById("modal")!
        )}
      <main className={classes.gamepage}>
        <div className={classes.gamestats_container}>
          <GameTimer time={time} />
        </div>
        <MemoryField
          fieldSize={fieldSize}
          checkForFinishedGame={checkForFinishedGame}
          active={gameIsActive}
        />
        <div className={classes.actions_container}>
          <Button onClick={startOrStopGame}>{!gameIsActive ? "STARTE SPIEL" : "ABBRECHEN"}</Button>
          {!gameIsActive && (
            <>
              {fieldSize === "small" && screenWidth > 801 && (
                <Button onClick={changeToBigField}>GROßES FELD</Button>
              )}
              {fieldSize === "big" && <Button onClick={changeToSmallField}>KLEINES FELD</Button>}
              <Button to={"/score"}>RANGLISTE</Button>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default GamePage;
