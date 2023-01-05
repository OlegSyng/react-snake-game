import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useInterval from "../hooks/use-interval";

import { snakeActions } from "../store/snake-slice";
import { gameActions } from "../store/game-slice";

import Navbar from "./UI/Navbar";
import Snake from "./Snake";
import Food from "./Food";

import classes from "./Board.module.css";

const Board = () => {
  const dispatch = useDispatch();
  const snake = useSelector((state) => state.snake);
  const food = useSelector((state) => state.food);
  const game = useSelector((state) => state.game);
  const { userInput, gridSize, snakeSpeed, isGameOver, isPaused } = game;

  useEffect(() => {
    const keyDownHandler = (event) => {
      dispatch(gameActions.userInput(event.key));
    };
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [dispatch]);

  useInterval(() => {
    if (isGameOver) {
      return;
    }

    const newHeadPosition = {
      x: snake[0].x + userInput.deltaX,
      y: snake[0].y + userInput.deltaY,
    };

    const equalPositions = (pos1, pos2) => {
      return pos1.x === pos2.x && pos1.y === pos2.y;
    };

    const outsideGrid = (position) => {
      return (position.x < 1 || position.x > gridSize || position.y < 1 || position.y > gridSize);
    };

    const onSnake = (position, snake, { ignoreHead = false } = {}) => {
      return snake.some((segment, index) => {
        if (ignoreHead && index === 0) {
          return false;
        } else {
          return equalPositions(segment, position);
        }
      });
    };

    if (outsideGrid(snake[0]) || onSnake(snake[0], snake, { ignoreHead: true })) {
      dispatch(gameActions.setGameOver());
      return;
    } else if (equalPositions(newHeadPosition, food)) {
      dispatch(snakeActions.snakeEats(
        {
          userInput,
          snake,
          gridSize,
        })
      );
    } else if (!isPaused) {
      dispatch(snakeActions.snakeMove({ userInput }));
    }

    dispatch(gameActions.lastUserInput(userInput));
  }, isPaused ? null : 1000 / snakeSpeed)


  const drawSnake = snake.map((segmentPosition) => (
    <Snake key={segmentPosition.id} segmentPosition={segmentPosition}></Snake>
  ));

  return (
    <>
      <Navbar />
      <div className={classes["game-board__background"]}>
        <div className={classes["game-board"]} style={{gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)`}}>
          {drawSnake}
          <Food foodPosition={food} />
        </div>
      </div>
    </>
  );
};

export default Board;

// let lastRenderTime = 0;

//     function generateMovement(currentTime) {
//       window.requestAnimationFrame(generateMovement);
//       const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
//       if (secondsSinceLastRender < 1 / snakeSpeed) return;

//       lastRenderTime = currentTime;
//       updateSnake();
//     }
//     window.requestAnimationFrame(generateMovement);