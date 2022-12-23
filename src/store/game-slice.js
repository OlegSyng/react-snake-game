import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPaused: false,
    isGameOver: false,
    score: 0,
    snakeSpeed: 6,
    gridSize: 51,
}

const gameSlice = createSlice({
    name:'game',
    initialState: initialState,
    reducers: {
        togglePause: (state) => {
            state.isPaused = !state.isPaused;
        },
        toggleGameOver: (state) => {
            state.isGameOver = !state.isGameOver;
        },
        updateScore: (state) => {
            state.score += 5;
        },
        snakeSpeed: (state, action) => {
            state.snakeSpeed = action.payload;
        },
        gridSize: (state, action) => {
            state.gridSize = action.payload;
        },
    },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;