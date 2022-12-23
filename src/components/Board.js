import React, { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";

import { snakeActions } from "../store/snake-slice";
import { foodActions } from "../store/food-slice";
import { gameActions } from "../store/game-slice";

import { GRID_SIZE } from "../store/food-slice";

import Navbar from "./UI/Navbar";
import Snake from "./Snake";
import Food from "./Food";

import classes from "./Board.module.css";

let inputDirection = 'ArrowUp';
let lastInputDirection = '';



const outsideGrid = (position) => {
  return (position.x < 1 || position.x >= GRID_SIZE || position.y < 1 || position.y >= GRID_SIZE);
}; 

const onSnake = (position, snake, { ignoreHead = false } = {}) => {
  return snake.some((segment, index) => {
    if (ignoreHead && index === 0) {
      return false
    } else {
      const equalPositions = (pos1, pos2) => {
        return pos1.x === pos2.x && pos1.y === pos2.y
      }
      return equalPositions(segment, position);
    }
  });
};


const objectsPositionReducer = (state, action) => {
  const { snakeBody, foodBody } = state;
  const snakeHead = snakeBody[0];


  const eatFood = (snakeFirstSegment, food) => {
    const deltaX = snakeFirstSegment.x - food.x;
    const deltaY = snakeFirstSegment.y - food.y;
    if (deltaX === action.differenceX && deltaY === action.differenceY) {
      return {
        snakeBody: [{id: Math.random(), ...foodBody}, ...snakeBody],
        foodBody: getRandomFoodPosition(),
        gamePause: false
      }
    }; 
  };

  const snakeEatsFoodState = {
    snakeBody: [{id: Math.random(), ...foodBody}, ...snakeBody],
    foodBody: getRandomFoodPosition(),
    gamePause: false
  };

  // switch (action.type) {
  //   case "Restart":
  //     return {...objectsPosition};
  //   case "Pause":
  //     return {
  //       snakeBody: snakeBody,
  //       foodBody: foodBody,
  //       gamePause: true
  //     }
  //   case "ArrowUp":
  //     if (eatFood(snakeHead, foodBody)) {
  //       return snakeEatsFoodState;
  //     } else {
  //       return {
  //         snakeBody: [{ id: Math.random(), x: snakeBody[0].x - 1, y: snakeBody[0].y }, ...snakeBody.slice(0, -1)],
  //         foodBody: foodBody,
  //         gamePause: false
  //       };
  //     } 
  //   case "ArrowDown":
  //     if (eatFood(snakeHead, foodBody)) {
  //       return snakeEatsFoodState;
  //     } else {
  //       return {
  //         snakeBody: [{ id: Math.random(), x: snakeBody[0].x + 1, y: snakeBody[0].y }, ...snakeBody.slice(0, -1)],
  //         foodBody: foodBody,
  //         gamePause: false
  //       };
  //     } 
  //   case "ArrowLeft":
  //     if (eatFood(snakeHead, foodBody)) {
  //       return snakeEatsFoodState;
  //     } else {
  //       return {
  //         snakeBody: [{ id: Math.random(), x: snakeBody[0].x, y: snakeBody[0].y - 1 }, ...snakeBody.slice(0, -1)],
  //         foodBody: foodBody,
  //         gamePause: false
  //       };
  //     } 
  //   case "ArrowRight":
  //     if (eatFood(snakeHead, foodBody)) {
  //       return snakeEatsFoodState;
  //     } else {
  //       return {
  //         snakeBody: [{ id: Math.random(), x: snakeBody[0].x, y: snakeBody[0].y + 1 }, ...snakeBody.slice(0, -1)],
  //         foodBody: foodBody,
  //         gamePause: false
  //       };
  //     }
  //   default:
  //     return objectsPosition; 
  //};
    
};

const Board = ({onGameOver, restart, resetApp, onScoreUpdate}) => {
  // const [objectsPositionState, dispatchObjectsPosition] = useReducer(objectsPositionReducer, objectsPosition);

  const dispatch = useDispatch();
  const snake = useSelector((state) => state.snake);
  const food = useSelector((state) => state.food);
  const game = useSelector((state) => state.game);

  // const [snakeSpeed, setSnakeSpeed] = useState(6);
  // const [gameScore, setGameScore] = useState(0);
  // const {snakeBody, foodBody} = objectsPositionState;

  // let SNAKE_SPEED = snakeSpeed;

  useEffect(() => {
    const keyDownHandler = (event) => {
      switch(event.key) {
        case "ArrowUp":
          if (inputDirection !== 'arrowDown') {
            lastInputDirection = inputDirection;
            inputDirection = 'arrowUp';
          }
          break;
        case "ArrowDown":
          if (inputDirection !== 'arrowUp') {
            lastInputDirection = inputDirection;
            inputDirection = 'arrowDown';
          }
          break;
        case "ArrowLeft":
          if (inputDirection !== 'arrowRight') {
            lastInputDirection = inputDirection;
            inputDirection = 'arrowLeft';
          }
          break;
        case "ArrowRight":
          if (inputDirection !== 'arrowLeft') {
            lastInputDirection = inputDirection;
            inputDirection = 'arrowRight';
          } 
          break;
      };
    }
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  useEffect(() => {
    const timeoutIdentifier = setTimeout(() => { 
      if(game.) {
        inputDirection = 'arrowUp';
        lastInputDirection = '';
        dispatch(gameActions.toggleRestart());
      }


      if (restart) {
        inputDirection = 'arrowUp';
        lastInputDirection = '';
        isPaused = false;
        dispatchObjectsPosition({type: "Restart", differenceX: null, differenceY: null});
        resetApp();
        return;
      };

      if (outsideGrid(snakeBody[0]) || onSnake(snakeBody[0], snakeBody, { ignoreHead: true })) {
        inputDirection = "";
        onGameOver();
        return;
      };

      if (isPaused) {
        dispatchObjectsPosition({type: "Pause", differenceX: null, differenceY: null});
        return
      };

      switch (inputDirection) {
        case "arrowUp":
          dispatch(snakeActions.arrowUp());
          break;
        case "arrowDown":
          dispatch(snakeActions.arrowDown());
          break;
        case "arrowLeft":
          dispatch(snakeActions.arrowLeft());
          break;
        case "arrowRight":
          dispatch(snakeActions.arrowRight());
          break;
        default:
          console.log('Unknown input provided.');
          break;
      };
      
      setGameScore((snakeBody.length * 5) - 15);
      onScoreUpdate(gameScore);
    }, 1000 / game.snakeSpeed);

    return () => {
      clearTimeout(timeoutIdentifier);
    };
  }, [restart, isPaused, snakeBody, game, inputDirection]);

  const pauseHandler = () => {
    if (!isPaused) {
      lastInputDirection = inputDirection;
    } else {
      inputDirection = lastInputDirection;
    }
    isPaused = !isPaused;
  };


  const drawSnake = snake.map((segmentPosition) => (
    <Snake key={segmentPosition.id} segmentPosition={segmentPosition}></Snake>
  ));

  const snakeSpeedHandler = (choice) => {
    setSnakeSpeed(choice.value);
  };

  return (
    <>
      <Navbar score={gameScore} onPause={pauseHandler} isPaused={isPaused} onSnakeSpeedChange={snakeSpeedHandler} />
      <div className={classes["game-board__background"]}>
        <div className={classes["game-board"]}>
          {drawSnake}
          <Food foodPosition={foodBody} />
        </div>
      </div>
    </>
  );
};

export default Board;

// let lastRenderTime = 0;
// const SNAKE_SPEED = 1;

// function generateMovement(currentTime) {
//   window.requestAnimationFrame(generateMovement);
//   const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
//   if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

//   lastRenderTime = currentTime;
//   updateSnake();
// }
// window.requestAnimationFrame(generateMovement);
