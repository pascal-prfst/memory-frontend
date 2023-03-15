import { useEffect, useState } from "react";

import classes from "./GameTimer.module.css";
import { convertSecondsToMinutes } from "../../utils/helper-functions";

type TimerProps = {
  time: number;
};

function GameTimer({ time }: TimerProps) {
  return (
    <div className={classes.timer_container}>
      <p>Zeit: {convertSecondsToMinutes(time)}</p>
    </div>
  );
}

export default GameTimer;
