import React, { useState } from "react";

import Board from "./components/Board";
import Modal from "./components/UI/Modal";
import Popup from "./components/Popup";

function App() {
  const [appState, setAppState] = useState({gameOver: false, restart: false});
  const [score, setScore] = useState(0);
  const {gameOver, restart} = appState;
  

  const gameOverHandler = () => {
    setAppState({gameOver: true, restart: false});
  };

  const restartHandler = () => {
    setAppState({gameOver: false, restart: true});
  };

  const resetAppHandler = () => {
    setAppState({gameOver: false, restart: false});
  };

  const scoreCounter = (points) => {
    setScore(points);
  };

  return (
    <>
      { gameOver && <Modal><Popup onRestart={restartHandler} score={score} /></Modal> }
      <Board onGameOver={gameOverHandler} restart={restart}  resetApp={resetAppHandler} onScoreUpdate={scoreCounter} />
    </>
  );
}

export default App;
