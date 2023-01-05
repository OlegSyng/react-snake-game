import { createAction, createSlice } from "@reduxjs/toolkit";
const snakeEats = createAction("snake/snakeEats");

const initialState = {
  userInput: {
    deltaX: -1,
    deltaY: 0,
  },
  lastUserInput: {
    deltaX: 1,
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
          if (state.lastUserInput.deltaX !== 1) {
            state.userInput.deltaX = -1;
            state.userInput.deltaY = 0;
          }
          break;
        case "ArrowDown":
          if (state.lastUserInput.deltaX !== -1) {
            state.userInput.deltaX = 1;
            state.userInput.deltaY = 0;
          }
          break;
        case "ArrowLeft":
          if (state.lastUserInput.deltaY !== 1) {
            state.userInput.deltaX = 0;
            state.userInput.deltaY = -1;
          }
          break;
        case "ArrowRight":
          if (state.lastUserInput.deltaY !== -1) {
            state.userInput.deltaX = 0;
            state.userInput.deltaY = 1;
          }
          break;
      }
    },
    lastUserInput: (state, action) => {
        state.lastUserInput.deltaX = action.payload.deltaX;
        state.lastUserInput.deltaY = action.payload.deltaY;
    },
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
    },
    setGameOver: (state) => {
      state.isGameOver = true;
      state.isPaused = true;
    },
    restartGame: (state) => {
        state.userInput.deltaX = -1;
        state.userInput.deltaY = 0;
        state.lastUserInput.deltaX = -1;
        state.lastUserInput.deltaY = 0;
        state.isPaused = false;
        state.isGameOver = false;
        state.score = 0
    },
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
    });
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
