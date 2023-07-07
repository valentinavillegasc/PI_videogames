require("dotenv").config(); //Permite acceder a las variables definidas en .env
const { API_KEY } = process.env;
const { Videogame, Genres } = require("../db");
const axios = require("axios");

const getApi = async () => {
  try {
    let response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );

    let result = [];
    for (let i = 0; i < 5; i++) {
      result = [...result, ...response.data.results];
      response = await axios.get(response.data.next);
    }

    const apiInfo = result.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description
          ? game.description
          : "without description",
        platforms: game.platforms.map((platform) => platform.platform.name),
        image: game.background_image,
        released: game.released,
        rating: game.rating,
        genres: game.genres.map((genre) => genre.name),
      };
    });
    return apiInfo;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDb = async () => {
  try {
    return await Videogame.findAll({ include: { model: Genres } });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getVideogames = async () => {
  try {
    const apiInfo = await getApi();
    const dbInfo = await getDb();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getVideogames;
