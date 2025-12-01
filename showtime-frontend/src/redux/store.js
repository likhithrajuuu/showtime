import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./reducers/moviesReducer";

const store = configureStore({
  reducer: {
    movieData: movieReducer,
  },
});

export default store;
