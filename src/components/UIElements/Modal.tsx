import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

import classes from "./Modal.module.css";
import { convertSecondsToMinutes } from "../../utils/helper-functions";
import Button from "../UIElements/Button";
import { RingLoader } from "react-spinners";

type ModalProps = {
  closeModal: () => void;
  time: number;
  fieldSize: string;
};

function Modal({ closeModal, time, fieldSize }: ModalProps) {
  const [personalRecord, setPersonalRecord] = useState(0);
  const [newRecord, setNewRecord] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputName, setInputName] = useState("");
  const [succesfulSubmit, setSuccesfulSubmit] = useState(false);

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
    const scoreData = { name: inputName, time: time, fieldSize: fieldSize };
    try {
      setIsLoading(true);
      const response = await fetch("https://memory-backend-phi.vercel.app/api/score", {
        method: "POST",
        body: JSON.stringify(scoreData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setIsLoading(false);
        setSuccesfulSubmit(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputName(event.target.value);
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
            {!isLoading && !succesfulSubmit && (
              <>
                <label htmlFor="name">
                  Trage deinen Namen (min: 5 Zeichen) in die Rangliste ein:
                </label>
                <input type="text" id="name" value={inputName} onChange={handleChange} />
                <Button inverted disabled={inputName.length <= 4} type="submit">
                  SENDEN
                </Button>{" "}
              </>
            )}

            {isLoading && <RingLoader size={140} color={"var(--blue)"} />}

            {!isLoading && succesfulSubmit && (
              <>
                <p>Erfolgreich in die Rangliste eingetragen!</p>
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
