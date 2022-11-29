import React from "react";

import classes from './Food.module.css';

const Food = (props) => {

    return (
        <div style={{ gridRowStart: props.foodPosition.x, gridColumnStart: props.foodPosition.y }} className={classes.food}></div>
    )
};

export default Food;