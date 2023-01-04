import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

import { gameActions } from "../../store/game-slice";

import Button from "./Button";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);

  const snakeSpeedOptions = [
    {value: 2, label: 1},
    {value: 4, label: 2},
    {value: 6, label: 3},
    {value: 8, label: 4},
    {value: 10, label: 5},
    {value: 12, label: 6},
    {value: 14, label: 7},
    {value: 16, label: 8},
    {value: 18, label: 9},
    {value: 20, label: 10},
  ];

  const snakeSpeedHandler = (choice) => {
    dispatch(gameActions.snakeSpeed(choice.value));
  }

  const onPauseHandler = () => {
    dispatch(gameActions.togglePause());
  }

  return (
    <div className={classes.navbar}>
      <div className={classes["navbar-score"]}>
        Score<span>{game.score}</span>
      </div>
      <Select options={snakeSpeedOptions} name="Snake speed" onChange={snakeSpeedHandler} defaultValue={snakeSpeedOptions[0]} />
      <Button onClick={onPauseHandler}>
        {!game.isPaused ? "Pause" : "Resume"}
      </Button>
    </div>
  );
};

export default Navbar;
