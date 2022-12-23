import { configureStore } from "@reduxjs/toolkit";
import snakeSlice from "./snake-slice";
import foodSlice from "./food-slice";
import gameSlice from "./game-slice";

export const store = configureStore({
    reducer: {
        snake: snakeSlice,
        food: foodSlice,
        game: gameSlice,
    }
})