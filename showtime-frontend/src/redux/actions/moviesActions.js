import axios from "axios";
import {
  GET_ALL_MOVIES_REQUEST,
  GET_ALL_MOVIES_SUCCESS,
  GET_ALL_MOVIES_FAILURE,
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