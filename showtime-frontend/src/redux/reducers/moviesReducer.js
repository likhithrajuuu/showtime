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
  
  const initialState = {
    loading: false,
    movies: [],
    error: null,
    topRatedLoading: false,
    topRatedMovies: [],
    topRatedError: null,
    bestOfLiveEventsLoading: false,
    bestOfLiveEvents: [],
    bestOfLiveEventsError: null,
  };
  
  export const movieReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_MOVIES_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_ALL_MOVIES_SUCCESS:
        return { ...state, loading: false, movies: action.payload, error: null };
      case GET_ALL_MOVIES_FAILURE:
        return { ...state, loading: false, movies: [], error: action.payload };
      case GET_TOP_RATED_MOVIES_REQUEST:
        return { ...state, topRatedLoading: true, topRatedError: null };
      case GET_TOP_RATED_MOVIES_SUCCESS:
        return { ...state, topRatedLoading: false, topRatedMovies: action.payload, topRatedError: null };
      case GET_TOP_RATED_MOVIES_FAILURE:
        return { ...state, topRatedLoading: false, topRatedMovies: [], topRatedError: action.payload };
      case GET_BEST_OF_LIVE_EVENTS_REQUEST:
        return { ...state, bestOfLiveEventsLoading: true, bestOfLiveEventsError: null };
      case GET_BEST_OF_LIVE_EVENTS_SUCCESS:
        return { ...state, bestOfLiveEventsLoading: false, bestOfLiveEvents: action.payload, bestOfLiveEventsError: null };
      case GET_BEST_OF_LIVE_EVENTS_FAILURE:
        return { ...state, bestOfLiveEventsLoading: false, bestOfLiveEvents: [], bestOfLiveEventsError: action.payload };
      default:
        return state;
    }
  };