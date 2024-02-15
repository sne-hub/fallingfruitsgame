import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  position: 0,
  fruits: [],
  allergyFruit: "",
  isPlaying: true,
  lives: 3,
  score: 0,
  gameOver: false,
  loading: false,
  error: null,
  eatenFruit: "",
  gameWon: false,
  dropFruitIntervals: [],
};

const movementSlice = createSlice({
  name: "movement",
  initialState,
  reducers: {
    moveLeft: (state) => {
      if (state.position > 0) state.position -= 10;
    },

    addToDropFruitIntervals: (state, action) => {
      state.dropFruitIntervals.push(action.payload);
    },

    moveRight: (state) => {
      state.position += 10;
    },

    setAllergyFruit: (state, action) => {
      state.allergyFruit =
        action.payload[parseInt(Math.random() * action.payload.length)];
    },

    decreaseLives: (state) => {
      if (
        state.eatenFruit.src === state.allergyFruit.src &&
        !state.gameOver &&
        !state.gameWon
      )
        state.lives -= 1;
    },

    setGameOver: (state) => {
      return {
        ...state,
        isPlaying: false,
        gameOver: state.lives >= 1 ? false : true,
      };
    },

    increaseScore: (state) => {
      if (
        state.eatenFruit.src !== state.allergyFruit.src &&
        !state.gameOver &&
        !state.gameWon
      )
        state.score += 1;
    },

    resetGame: () => {
      return {
        ...initialState,
      };
    },

    fetchDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.fruits = action.payload;
    },

    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setEatenFruit: (state, action) => {
      state.eatenFruit = action.payload;
    },

    stopTimer: (state) => {
      return {
        ...state,
        isPlaying: false,
        gameWon: state.score > 0 ? true : false,
        gameOver: state.score === 0 ? true : false,
      };
    },
  },
});

export const {
  moveLeft,
  moveRight,
  setAllergyFruit,
  decreaseLives,
  increaseScore,
  setGameOver,
  resetGame,
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  setEatenFruit,
  stopTimer,
  setPaused,
  addToDropFruitIntervals,
} = movementSlice.actions;

export default movementSlice.reducer;
