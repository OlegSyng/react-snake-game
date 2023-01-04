import React from "react";

import { useSelector } from "react-redux";


import Board from "./components/Board";
import Modal from "./components/UI/Modal";
import Popup from "./components/Popup";

function App() {
  const gameOver = useSelector((state) => state.game.isGameOver);

  return (
    <>
      { gameOver && <Modal><Popup /></Modal> }
      <Board />
    </>
  );
}

export default App;
