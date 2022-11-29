import React from "react";
import classes from "./Snake.module.css";

const Snake = (props) => {

  return <div style={{ gridRowStart: props.segmentPosition.x, gridColumnStart: props.segmentPosition.y }} className={classes.snake}></div>
};

export default Snake;
