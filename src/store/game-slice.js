import { createAction, createSlice } from "@reduxjs/toolkit";
const snakeEats = createAction('snake/snakeEats');

const initialState = {
  userInput: {
    deltaX: -1,
    deltaY: 0,
  },
  isPaused: false,
  isGameOver: false,
  score: 0,
  snakeSpeed: 2,
  gridSize: 51,
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    userInput: (state, action) => {
      switch (action.payload) {
        case "ArrowUp":
          if (state.userInput.deltaX !== 1) {
            state.userInput.deltaX = -1;
            state.userInput.deltaY = 0;
          }
          break;
        case "ArrowDown":
          if (state.userInput.deltaX !== -1) {
            state.userInput.deltaX = 1;
            state.userInput.deltaY = 0;
          }
          break;
        case "ArrowLeft":
          if (state.userInput.deltaY !== 1) {
            state.userInput.deltaX = 0;
            state.userInput.deltaY = -1;
          }
          break;
        case "ArrowRight":
          if (state.userInput.deltaY !== -1) {
            state.userInput.deltaX = 0;
            state.userInput.deltaY = 1;
          }
          break;
      }
    },
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
    },
    setGameOver: (state) => {
      state.isGameOver = true;
    },
    restartGame: () => initialState,
    snakeSpeed: (state, action) => {
      state.snakeSpeed = action.payload;
    },
    gridSize: (state, action) => {
      state.gridSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(snakeEats, (state) => {
        state.score += 5;
    })
  }
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
