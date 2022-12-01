import React from "react";
import Button from "./UI/Button";
import classes from "./Popup.module.css";

const Popup = (props) => {
  return (
    <>
      <div className={classes["game-over"]}>GAME OVER</div>
      <div className={classes["action-container"]}>
        <div className={classes.score}>
          Your Score: <span>{props.score}</span>
        </div>
        <Button onClick={props.onRestart}>Restart</Button>
      </div>
    </>
  );
};

export default Popup;
