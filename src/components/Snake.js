import React, {Fragment} from "react";

import classes from './Snake.module.css';





const Snake = () => {
    
    
    let snakeBody = [{x: 26, y: 26}];

   
    

    var snakeSegment = <div className={classes.snake}></div>;
    
    const snake = snakeBody.map(segment => {
        snakeSegment.style.gridRowStart = segment.x;
        snakeSegment.style.gridColumnStart = segment.y;
        return snakeSegment;
    }) 

    return (
        <Fragment>{snake}</Fragment>
    )
};

export default Snake;