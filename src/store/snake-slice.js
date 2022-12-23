import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: Math.random(), x: 26, y: 26 },
  { id: Math.random(), x: 27, y: 26 },
  { id: Math.random(), x: 28, y: 26 },
];

const snakeSlice = createSlice({
  name: "snake",
  initialState: initialState,
  reducers: {
    arrowUp: (state) => {
      const snakeHead = state[0];
      state.unshift({
        id: Math.random(),
        x: snakeHead.x - 1,
        y: snakeHead.y 
      }).slice(0, -1);
    },
    arrowDown: (state) => {
      const snakeHead = state[0];
      state.unshift({
        id: Math.random(),
        x: snakeHead.x + 1,
        y: snakeHead.y 
      }).slice(0, -1);
    },
    arrowLeft: (state) => {
      const snakeHead = state[0];
      state.unshift({
        id: Math.random(),
        x: snakeHead.x,
        y: snakeHead.y - 1 
      }).slice(0, -1);
    },
    arrowRight: (state) => {
      const snakeHead = state[0];
      state.unshift({
        id: Math.random(),
        x: snakeHead.x,
        y: snakeHead.y + 1 
      }).slice(0, -1);
    },
    restartSnake: (state) => {
      state = initialState;
    },
  },
});

export const snakeActions = snakeSlice.actions;

export default snakeSlice.reducer;
