import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { snakeActions } from "./store/snake-slice";
import { foodActions } from "./store/food-slice";
import { gameActions } from "./store/game-slice";

import Board from "./components/Board";
import Modal from "./components/UI/Modal";
import Popup from "./components/Popup";

function App() {
  const dispatch = useDispatch();
  const gameOver = useSelector((state) => state.game.isGameOver);

  // const [appState, setAppState] = useState({gameOver: false, restart: false});
  // const [score, setScore] = useState(0);
  // const {gameOver, restart} = appState;
  

  // const gameOverHandler = () => {
  //   setAppState({gameOver: true, restart: false});
  // };

  // const restartHandler = () => {
  //   setAppState({gameOver: false, restart: true});
  // };

  // const resetAppHandler = () => {
  //   setAppState({gameOver: false, restart: false});
  // };

  // const scoreCounter = (points) => {
  //   setScore(points);
  // };

  return (
    <>
      { gameOver && <Modal><Popup /></Modal> }
      <Board onGameOver={gameOverHandler} restart={restart}  resetApp={resetAppHandler} />
    </>
  );
}

export default App;
