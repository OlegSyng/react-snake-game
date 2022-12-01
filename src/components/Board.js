import React, { useState, useEffect, useReducer } from "react";

import Navbar from "./UI/Navbar";
import Snake from "./Snake";
import Food from "./Food";

import classes from "./Board.module.css";

const GRID_SIZE = 51;
let inputDirection = 'ArrowUp';
let lastInputDirection = '';
let isPaused = false;


const objectsPosition = {
  snakeBody: [
    { id: Math.random(), x: 26, y: 26 },
    { id: Math.random(), x: 27, y: 26 },
    { id: Math.random(), x: 28, y: 26 },
  ],
  foodBody: { x: 20, y: 26 },
  gamePause: false
};

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

  
  const randomGridPosition = () => {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
  };

  const getRandomFoodPosition = () => {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition, snakeBody)) {
      newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
  };

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

  switch (action.type) {
    case "Restart":
      return {...objectsPosition};
    case "Pause":
      return {
        snakeBody: snakeBody,
        foodBody: foodBody,
        gamePause: true
      }
    case "ArrowUp":
      if (eatFood(snakeHead, foodBody)) {
        return snakeEatsFoodState;
      } else {
        return {
          snakeBody: [{ id: Math.random(), x: snakeBody[0].x - 1, y: snakeBody[0].y }, ...snakeBody.slice(0, -1)],
          foodBody: foodBody,
          gamePause: false
        };
      } 
    case "ArrowDown":
      if (eatFood(snakeHead, foodBody)) {
        return snakeEatsFoodState;
      } else {
        return {
          snakeBody: [{ id: Math.random(), x: snakeBody[0].x + 1, y: snakeBody[0].y }, ...snakeBody.slice(0, -1)],
          foodBody: foodBody,
          gamePause: false
        };
      } 
    case "ArrowLeft":
      if (eatFood(snakeHead, foodBody)) {
        return snakeEatsFoodState;
      } else {
        return {
          snakeBody: [{ id: Math.random(), x: snakeBody[0].x, y: snakeBody[0].y - 1 }, ...snakeBody.slice(0, -1)],
          foodBody: foodBody,
          gamePause: false
        };
      } 
    case "ArrowRight":
      if (eatFood(snakeHead, foodBody)) {
        return snakeEatsFoodState;
      } else {
        return {
          snakeBody: [{ id: Math.random(), x: snakeBody[0].x, y: snakeBody[0].y + 1 }, ...snakeBody.slice(0, -1)],
          foodBody: foodBody,
          gamePause: false
        };
      }
    default:
      return objectsPosition; 
  };
    
};

const Board = ({onGameOver, restart, resetApp, onScoreUpdate}) => {
  const [objectsPositionState, dispatchObjectsPosition] = useReducer(objectsPositionReducer, objectsPosition);
  const [snakeSpeed, setSnakeSpeed] = useState(6);
  const [gameScore, setGameScore] = useState(0);
  const {snakeBody, foodBody} = objectsPositionState;

  let SNAKE_SPEED = snakeSpeed;

  useEffect(() => {
    const keyDownHandler = (event) => {
      switch(event.key) {
        case "ArrowUp":
          if (inputDirection !== 'ArrowDown') {
            lastInputDirection = inputDirection;
            inputDirection = 'ArrowUp';
          }
          break;
        case "ArrowDown":
          if (inputDirection !== 'ArrowUp') {
            lastInputDirection = inputDirection;
            inputDirection = 'ArrowDown';
          }
          break;
        case "ArrowLeft":
          if (inputDirection !== 'ArrowRight') {
            lastInputDirection = inputDirection;
            inputDirection = 'ArrowLeft';
          }
          break;
        case "ArrowRight":
          if (inputDirection !== 'ArrowLeft') {
            lastInputDirection = inputDirection;
            inputDirection = 'ArrowRight';
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
      if (restart) {
        inputDirection = 'ArrowUp';
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
        case "ArrowUp":
          dispatchObjectsPosition({type: "ArrowUp", differenceX: 1, differenceY: 0});
          break;
        case "ArrowDown":
          dispatchObjectsPosition({type: "ArrowDown", differenceX: -1, differenceY: 0});
          break;
        case "ArrowLeft":
          dispatchObjectsPosition({type: "ArrowLeft", differenceX: 0, differenceY: 1});
          break;
        case "ArrowRight":
          dispatchObjectsPosition({type: "ArrowRight", differenceX: 0, differenceY: -1});
          break;
      };
      
      setGameScore((snakeBody.length * 5) - 15);
      onScoreUpdate(gameScore);
    }, 1000 / SNAKE_SPEED);

    return () => {
      clearTimeout(timeoutIdentifier);
    };
  }, [restart, isPaused, snakeBody, inputDirection, objectsPositionState]);

  const pauseHandler = () => {
    if (!isPaused) {
      lastInputDirection = inputDirection;
    } else {
      inputDirection = lastInputDirection;
    }
    isPaused = !isPaused;
  };


  const snake = snakeBody.map((segmentPosition) => (
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
          {snake}
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
