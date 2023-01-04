import { createAction, createSlice } from "@reduxjs/toolkit";

const restartGame = createAction('game/restartGame');

const initialState = [
  { id: Math.random(), x: 26, y: 26 },
  { id: Math.random(), x: 27, y: 26 },
  { id: Math.random(), x: 28, y: 26 },
];

const snakeSlice = createSlice({
  name: 'snake',
  initialState: initialState,
  reducers: {
    snakeMove: (state, action) => {
      const snakeHead = state[0];
      state.unshift({
        id: Math.random(),
        x: snakeHead.x + action.payload.userInput.deltaX,
        y: snakeHead.y + action.payload.userInput.deltaY,
      });
      state.pop();
    },
    snakeEats: (state, action) => {
      const snakeHead = state[0];
      state.unshift({
        id: Math.random(),
        x: snakeHead.x + action.payload.userInput.deltaX,
        y: snakeHead.y + action.payload.userInput.deltaY,
      });
      const newSnakeHead = state[0];
      state.unshift({
        id: Math.random(),
        x: newSnakeHead.x + action.payload.userInput.deltaX,
        y: newSnakeHead.y + action.payload.userInput.deltaY,
      });
      state.pop();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restartGame, () => initialState)
  }
});

export const snakeActions = snakeSlice.actions;

export default snakeSlice.reducer;
