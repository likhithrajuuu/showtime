import axios from "axios";
import {
  GET_ALL_MOVIES_REQUEST,
  GET_ALL_MOVIES_SUCCESS,
  GET_ALL_MOVIES_FAILURE,
  GET_TOP_RATED_MOVIES_REQUEST,
  GET_TOP_RATED_MOVIES_SUCCESS,
  GET_TOP_RATED_MOVIES_FAILURE,
  GET_BEST_OF_LIVE_EVENTS_REQUEST,
  GET_BEST_OF_LIVE_EVENTS_SUCCESS,
  GET_BEST_OF_LIVE_EVENTS_FAILURE,
} from "../constants/moviesConstants";

export const getAllMovies = () => async (dispatch) => {
  dispatch({ type: GET_ALL_MOVIES_REQUEST });

  try {
    const response = await axios.get("http://localhost:8080/api/movies/getall");
    dispatch({ type: GET_ALL_MOVIES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_MOVIES_FAILURE,
      payload: error.response?.data || "Error fetching movies",
    });
  }
};

export const getTopRatedMovies = () => async (dispatch) => {
  dispatch({ type: GET_TOP_RATED_MOVIES_REQUEST });

  try {
    const response = await axios.get("http://localhost:8080/api/movies/top-rated");
    dispatch({ type: GET_TOP_RATED_MOVIES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_TOP_RATED_MOVIES_FAILURE,
      payload: error.response?.data || "Error fetching top rated movies",
    });
  }
};

export const getBestOfLiveEvents = () => async (dispatch) => {
  dispatch({ type: GET_BEST_OF_LIVE_EVENTS_REQUEST });

  try {
    const response = await axios.get("http://localhost:8080/api/events/best-of-live");
    dispatch({ type: GET_BEST_OF_LIVE_EVENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_BEST_OF_LIVE_EVENTS_FAILURE,
      payload: error.response?.data || "Error fetching best of live events",
    });
  }
};