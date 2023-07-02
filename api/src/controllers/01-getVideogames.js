require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genres } = require("../db");
const axios = require("axios");
//https://api.rawg.io/api/games?key=${API_KEY}

const getApi = async () => {
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
      description: game.description ? game.description : "sin descripcion",
      platforms: game.platforms.map((platform) => platform.platform.name),
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map((genre) => genre.name),
    };
  });
  return apiInfo;
};

const getDb = async () => {
  return await Videogame.findAll({ include: { model: Genres } });
};

const getVideogames = async () => {
  const apiInfo = await getApi();
  const dbInfo = await getDb();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

module.exports = getVideogames;

/* 
const getApi = async () => {
  const response = await axios.get(
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
      description: game.description ? game.description : "sin descripcion",
      platforms: game.platforms.map((plat) => plat.platform.name),
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map((genre) => genre.name),
    };
  });
  return apiInfo;
};

const getDb = async () => {
  return await Videogame.findAll({
    include: {
      model: Genres,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
};

const getVideogames = async () => {
  const apiInfo = await getApi();
  const dbInfo = await getDb();
  return [...apiInfo, ...dbInfo];
};

module.exports = getVideogames; */
