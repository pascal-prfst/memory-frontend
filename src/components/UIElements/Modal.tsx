import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

import classes from "./Modal.module.css";
import { convertSecondsToMinutes } from "../../utils/helper-functions";
import Button from "../UIElements/Button";

type ModalProps = {
  closeModal: () => void;
  time: number;
  fieldSize: string;
};

function Modal({ closeModal, time, fieldSize }: ModalProps) {
  const [personalRecord, setPersonalRecord] = useState(0);
  const [newRecord, setNewRecord] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`personal-record-${fieldSize}`) === null) {
      localStorage.setItem(`personal-record-${fieldSize}`, JSON.stringify(time));
      setNewRecord(true);
      setPersonalRecord(time);
    } else {
      const pr = JSON.parse(localStorage.getItem(`personal-record-${fieldSize}`) || "");
      if (time !== 0 && time < pr) {
        localStorage.setItem(`personal-record-${fieldSize}`, JSON.stringify(time));
        setNewRecord(true);
        setPersonalRecord(time);
      } else if (time > pr) {
        setNewRecord(false);
      }
    }
  }, []);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const scoreData = { name: "Pascal", time: time, fieldSize: fieldSize };
    try {
      const response = await fetch("https://memory-backend-phi.vercel.app/api/score", {
        method: "POST",
        body: JSON.stringify(scoreData),
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={classes.modal}>
      <AiOutlineCloseCircle className={classes.icon} onClick={closeModal} />
      {newRecord && (
        <>
          <h2>Neuer Rekord!</h2>
          <p>Du hast einen neuen Rekord gebrochen!</p> <p>Deine Zeit ist:</p>
          <div className={classes.time}>{convertSecondsToMinutes(personalRecord)}</div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Trage deinen Namen in die Rangliste ein:</label>
            <input type="text" id="name" />
            <Button inverted type="submit">
              SENDEN
            </Button>
          </form>
        </>
      )}
      {!newRecord && (
        <>
          <h2>Kein neuer Rekord!</h2>
          <p>Deine Zeit ist:</p>
          <span className={classes.time}>{convertSecondsToMinutes(time)}</span>
          <p>Deine beste Zeit ist:</p>
          <span className={classes.time}>
            {convertSecondsToMinutes(Number(localStorage.getItem(`personal-record-${fieldSize}`)))}
          </span>
          <div className={classes.action_container}>
            <Button inverted onClick={closeModal}>
              Neues Spiel
            </Button>
            <Button inverted to="/score">
              Rangliste
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Modal;
