const { Router } = require("express");
const getVideogames = require("../controllers/01-getVideogames");
const getVideogameById = require("../controllers/02-getVideogameById");
const createVideogame = require("../controllers/03-createVideogame");

const videogameRouter = Router();

//Traer por nombre o todo
videogameRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const videogames = await getVideogames();
    if (name) {
      const VideogameFilter = videogames.filter((v) =>
        v.name.toLowerCase().includes(name.toLowerCase())
      );
      VideogameFilter.length
        ? res.status(200).json(VideogameFilter)
        : res.status(400).json("Videogame not found");
    } else {
      res.status(200).json(videogames);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Traer por id
videogameRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api";
  try {
    const game = await getVideogameById(id, source);
    res.status(200).json(game);
  } catch (error) {
    res.status(404).json(error);
  }
});

//Crear Videogame
videogameRouter.post("/", async (req, res) => {
  const { id, name, description, platforms, image, released, rating, genres } =
    req.body;

  try {
    const newGame = await createVideogame({
      id,
      name,
      description,
      platforms,
      image,
      released,
      rating,
      genres,
    });
    res.status(200).json(newGame);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = videogameRouter;
