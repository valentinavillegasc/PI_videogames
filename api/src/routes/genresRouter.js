require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const axios = require("axios");
const { Genres } = require("../db");

const genresRouter = Router();

genresRouter.get("/", async (req, res) => {
  const apiGenres = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  try {
    let gameGenre = apiGenres.data.results.map((genre) => genre.name);
    gameGenre.forEach((genre) => {
      Genres.findOrCreate({
        where: { name: genre },
      });
    });

    const allGenres = await Genres.findAll();

    res.status(200).json(allGenres);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = genresRouter;
