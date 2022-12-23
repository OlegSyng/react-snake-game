import { createSlice } from "@reduxjs/toolkit";

export const GRID_SIZE = 51;

const foodSlice = createSlice({
  name: "food",
  initialState: { x: 20, y: 26 },
  reducers: {
    getRandomFoodPosition: (state, action) => {
      let newFoodPosition;
      const randomGridPosition = () => {
        return {
          x: Math.floor(Math.random() * GRID_SIZE) + 1,
          y: Math.floor(Math.random() * GRID_SIZE) + 1,
        };
      };

      while (newFoodPosition == null || onSnake(newFoodPosition, action.payload)) {
        newFoodPosition = randomGridPosition();
      }
      state = newFoodPosition;
    },
  },
});

export const foodActions = foodSlice.actions;

export default foodSlice.reducer;
