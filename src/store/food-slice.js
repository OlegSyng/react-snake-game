import { createAction, createSlice } from "@reduxjs/toolkit";
const snakeEats = createAction('snake/snakeEats');
const restartGame = createAction('game/restartGame');

const initialState = {
  x: 20,
  y: 26,
};

const foodSlice = createSlice({
  name: 'food',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(snakeEats, (state, action) => {

      let newFoodPosition;

      const randomGridPosition = () => {
        return {
          x: Math.floor(Math.random() * action.payload.gridSize) + 1,
          y: Math.floor(Math.random() * action.payload.gridSize) + 1,
        };
      };

      const onSnake = (position, snake, { ignoreHead = false } = {}) => {
        return snake.some((segment, index) => {
          if (ignoreHead && index === 0) {
            return false;
          } else {
            const equalPositions = (pos1, pos2) => {
              return pos1.x === pos2.x && pos1.y === pos2.y;
            };
            return equalPositions(segment, position);
          }
        });
      };

      while ( newFoodPosition == null || onSnake(newFoodPosition, action.payload.snake)) {
        newFoodPosition = randomGridPosition();
      }

      state.x = newFoodPosition.x;
      state.y = newFoodPosition.y;
    });
    builder.addCase(restartGame, () => initialState);
  },
});

export const foodActions = foodSlice.actions;

export default foodSlice.reducer;
