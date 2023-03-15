import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";

import classes from "./ScorePage.module.css";
import Button from "../components/UIElements/Button";
import { convertSecondsToMinutes } from "../utils/helper-functions";

type ScoreType = {
  name: string;
  time: number;
  fieldSize: string;
};

function ScorePage() {
  const [filterOptions, setFilterOptions] = useState("big");
  const [isLoading, setIsLoading] = useState(false);
  const [scoreData, setScoreDate] = useState<ScoreType[]>();

  useEffect(() => {
    async function fetchScore() {
      try {
        setIsLoading(true);
        const response = await fetch("https://memory-backend-phi.vercel.app/api/score");
        const data = await response.json();
        const filteredData = data.score
          .filter((score: ScoreType) => score.fieldSize === filterOptions)
          .sort((a: ScoreType, b: ScoreType) => (a.time < b.time ? -1 : 1));
        setScoreDate(filteredData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchScore();
  }, [filterOptions]);

  function showBigRank() {
    setFilterOptions("big");
  }

  function showSmallRank() {
    setFilterOptions("small");
  }

  return (
    <main className={classes.scorepage}>
      <h1>Rangliste {filterOptions === "big" ? "großes" : "kleines"} Feld</h1>
      <div className={classes.switch_score_container}>
        <Button onClick={showSmallRank}>KLEINES FELD</Button>
        <Button onClick={showBigRank}>GROßES FELD</Button>
      </div>
      <div className={classes.scoreboard}>
        {isLoading && <RingLoader size={100} color={"#fff"} className={classes.spinner} />}
        {scoreData && !isLoading && (
          <ul>
            {scoreData &&
              scoreData.map((data, index) => {
                return (
                  <li key={index}>
                    <div className={classes.score_entry}>
                      <p>
                        {index + 1}. {data.name}
                      </p>
                      <p>{convertSecondsToMinutes(data.time)}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
      <div className={classes.actions_container}>
        <Button to="/memory">NEUES SPIEL</Button>
      </div>
    </main>
  );
}

export default ScorePage;
