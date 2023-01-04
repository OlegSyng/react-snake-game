import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "../store/game-slice";

import Button from "./UI/Button";
import classes from "./Popup.module.css";

const Popup = () => {
  const dispatch = useDispatch();
  const gameScore = useSelector((state) => state.game.score);

  const onRestartHandler = () => {
    dispatch(gameActions.restartGame())
  }

  return (
    <>
      <div className={classes["game-over"]}>GAME OVER</div>
      <div className={classes["action-container"]}>
        <div className={classes.score}>
          Your Score: <span>{gameScore}</span>
        </div>
        <Button onClick={onRestartHandler}>Restart</Button>
      </div>
    </>
  );
};

export default Popup;
