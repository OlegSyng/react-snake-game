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
    builder.addCase(restartGame, (state, action) => {
      //Head position on the center of the board.
      const headPosition = Math.floor(action.payload / 2) + 1;
      return [
        {
          id: Math.random(), 
          x: headPosition, 
          y: headPosition
        },
        {
          id: Math.random(), 
          x: headPosition + 1,
          y: headPosition
        },
        {
          id: Math.random(), 
          x: headPosition + 2,
          y: headPosition
        },
      ] 
    })
  }
});

export const snakeActions = snakeSlice.actions;

export default snakeSlice.reducer;
