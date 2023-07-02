import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_ID,
  GET_VIDEOGAME_NAME,
  GET_GENRES,
  CLEAN_DETAIL,
  FILTER_BY_GENRE,
  FILTER_BY_SOURCE,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
} from "./action-types";
import axios from "axios";

export const getVideogames = () => {
  return async function (dispatch) {
    const infoGames = await axios.get(`http://localhost:3001/videogames`, {});

    return dispatch({ type: GET_VIDEOGAMES, payload: infoGames.data });
  };
};

export const getVideogame = (id) => {
  return async function (dispatch) {
    const infoGames = await axios.get(`http://localhost:3001/videogames/${id}`);
    const game = infoGames.data;
    dispatch({ type: GET_VIDEOGAME_ID, payload: game });
  };
};

export const getVideogameByName = (name) => {
  return async function (dispatch) {
    const infoGames = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    const game = infoGames.data;
    dispatch({ type: GET_VIDEOGAME_NAME, payload: game });
  };
};

/* export const getVideogameByName = (name) => {
  return async function (dispatch) {
    const response = await fetch(
      `http://localhost:3001/videogames/?name=${name}`
    );
    const game = await response.json();
    dispatch({ type: GET_VIDEOGAME_NAME, payload: game });
  };
}; */

export const getGenres = () => {
  return async function (dispatch) {
    const infoGenres = await axios.get("http://localhost:3001/genres/");
    const genres = infoGenres.data;
    dispatch({ type: GET_GENRES, payload: genres });
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

//Filters

export const filterByGenre = (genre) => {
  return { type: FILTER_BY_GENRE, payload: genre };
};

export const filterBySource = (source) => {
  return { type: FILTER_BY_SOURCE, payload: source };
};

//Order

export const orderByName = (name) => {
  return { type: ORDER_BY_NAME, payload: name };
};

export const orderByRating = (rating) => {
  return { type: ORDER_BY_RATING, payload: rating };
};
