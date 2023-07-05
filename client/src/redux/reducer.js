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
const initialState = {
  allVideogames: [],
  videogames: [],
  videogameDetail: [],
  genres: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
        videogames: action.payload,
      };
    case GET_VIDEOGAME_ID:
      return { ...state, videogameDetail: action.payload };
    case GET_VIDEOGAME_NAME:
      return { ...state, videogames: action.payload };
    case GET_GENRES:
      return { ...state, genres: action.payload };

    case CLEAN_DETAIL:
      return { ...state, videogameDetail: {} };

    //Filters
    case FILTER_BY_GENRE:
      if (action.payload === "All") {
        return { ...state, videogames: state.allVideogames };
      } else {
        const allGames = state.allVideogames;
        const filteredGames = allGames.filter((game) =>
          game.genres.includes(action.payload)
        );
        return { ...state, videogames: filteredGames };
      }

    case FILTER_BY_SOURCE:
      if (action.payload === "created") {
        const filteredGamesBySource = state.allVideogames.filter(
          (game) => game.created === true
        );
        return {
          ...state,
          videogames: filteredGamesBySource,
        };
      } else if (action.payload === "api") {
        const filteredGamesBySource = state.allVideogames.filter(
          (game) => !game.created
        );
        return {
          ...state,
          videogames: filteredGamesBySource,
        };
      } else if (action.payload === "All") {
        return {
          ...state,
          videogames: state.allVideogames,
        };
      }
      break;
    //Order
    case ORDER_BY_NAME:
      const isAscending = action.payload === "asc";
      const sortedGames = [...state.allVideogames].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return isAscending ? -1 : 1;
        if (nameA > nameB) return isAscending ? 1 : -1;
        return 0;
      });
      return {
        ...state,
        videogames: sortedGames,
      };

    case ORDER_BY_RATING:
      const videogamesCopy = [...state.videogames];
      videogamesCopy.sort((a, b) => {
        if (action.payload === "high-low") {
          return b.rating - a.rating;
        } else {
          return a.rating - b.rating;
        }
      });
      return {
        ...state,
        videogames: videogamesCopy,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
