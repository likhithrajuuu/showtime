import {
    GET_ALL_MOVIES_REQUEST,
    GET_ALL_MOVIES_SUCCESS,
    GET_ALL_MOVIES_FAILURE,
  } from "../constants/moviesConstants";
  
  const initialState = {
    loading: false,
    movies: [],
    error: null,
  };
  
  export const movieReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_MOVIES_REQUEST:
        return { ...state, loading: true };
      case GET_ALL_MOVIES_SUCCESS:
        return { loading: false, movies: action.payload, error: null };
      case GET_ALL_MOVIES_FAILURE:
        return { loading: false, movies: [], error: action.payload };
      default:
        return state;
    }
  };