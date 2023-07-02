require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genres } = require("../db");
const axios = require("axios");

const getVideogameById = async (id, source) => {
  let videogame;

  if (source === "api") {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const game = response.data;

    videogame = {
      id: game.id,
      name: game.name,
      description: game.description ? game.description : "sin descripcion",
      platforms: game.platforms.map((platform) => platform.platform.name),
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map((genre) => genre.name),
    };
  } else {
    videogame = await Videogame.findByPk(id, {
      attributes: [
        "id",
        "name",
        "description",
        "platforms",
        "image",
        "released",
        "rating",
      ],
      include: { model: Genres },
    });
  }
  return videogame;
};

module.exports = getVideogameById;
