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

  const gridSizeOptions = [
    {value: 21, label: 21},
    {value: 25, label: 25},
    {value: 31, label: 31},
    {value: 35, label: 35},
    {value: 41, label: 41},
    {value: 45, label: 45},
    {value: 51, label: 51},
  ]

  const gridSizeHandler = (choice) => {
    dispatch(gameActions.gridSize(choice.value));
  }

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
      <Select options={gridSizeOptions} className={classes.select} name="Grid size" onChange={gridSizeHandler} placeholder="Grid size" />
      <Select options={snakeSpeedOptions} name="Snake speed" onChange={snakeSpeedHandler} placeholder="Snake speed" />
      <Button onClick={onPauseHandler}>
        {!game.isPaused ? "Pause" : "Resume"}
      </Button>
    </div>
  );
};

export default Navbar;
