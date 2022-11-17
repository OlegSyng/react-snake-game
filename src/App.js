import React from "react";

import Board from "./components/Board";
import Snake from "./components/Snake";
import Navbar from "./components/UI/Navbar";



function App() {
  let lastRenderTime = 0;
  const SNAKE_SPEED = 1;
  
  function generateMovement(currentTime) {
    window.requestAnimationFrame(generateMovement);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;
    //console.log('Render');

    //update();
    //draw();
  }

  window.requestAnimationFrame(generateMovement);

  return (
    <>
      <Navbar />
      <Board>
        <Snake />
      </Board>
    </>
  );
}

export default App;
