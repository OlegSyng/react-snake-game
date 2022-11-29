import React, { useState } from "react";

import Board from "./components/Board";
import Modal from "./components/UI/Modal";
import Popup from "./components/Popup";

function App() {
  const [restartGame, setRestartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const gameOverHandler = () => {
    setGameOver(true);
  };

  const restartHandler = () => {
    setGameOver(false);
    setRestartGame(true)
    //window.location = '/'
  }


  return (
    <>
      {gameOver && <Modal>
        <Popup onRestart={restartHandler} />
      </Modal>}
      <Board onGameOver={gameOverHandler} restart={restartGame}/>
    </>
  );
}

export default App;
