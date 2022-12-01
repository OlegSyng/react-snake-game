import React from "react";
import Select from "react-select";

import Button from "./Button";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const isGamePaused = props.isPaused;

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

  return (
    <div className={classes.navbar}>
      <div className={classes["navbar-score"]}>
        Score<span>{props.score}</span>
      </div>
      <Select options={snakeSpeedOptions} name="Snake speed" onChange={props.onSnakeSpeedChange} defaultValue={snakeSpeedOptions[2]} />
      <Button onClick={props.onPause}>
        {!isGamePaused ? "Pause" : "Resume"}
      </Button>
    </div>
  );
};

export default Navbar;
