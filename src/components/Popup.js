import React from "react";

import Button from "./UI/Button";

import snakeLogo from "../assets/snake-svgrepo-com.svg";
import classes from "./Popup.module.css";

const Popup = (props) => {
  return (
    <>
      <div className={classes["snake-game-title"]}>
        <img src={snakeLogo} alt="Snake Game logo" />
        Snake Game
      </div>
      <div className={classes["game-over"]}>GAME OVER</div>
      <div className={classes["action-container"]}>
        <div className={classes.score}>
          Score<span>6848</span>
        </div>
        <Button onClick={props.onRestart}>Restart</Button>
      </div>
    </>
  );
};

export default Popup;
