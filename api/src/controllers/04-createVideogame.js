const { Videogame, Genres } = require("../db");
const { Op } = require("sequelize");

const createVideogame = async (videogame) => {
  const { id, name, description, platforms, image, released, rating, genres } =
    videogame;

  if (!name || !platforms || !image || !released || !rating || !genres)
    throw Error("You are missing some information");

  const newGame = await Videogame.create({
    id,
    name,
    description,
    platforms,
    image,
    released,
    rating,
  });

  let findGenres = await Genres.findAll({
    where: {
      name: genres,
      //name: { [Op.in]: genres },
      //name: { [Op.iLike]: `%${genres}%` },
    },
  });

  await newGame.addGenres(findGenres);

  const result = await Videogame.findOne({
    where: { id: newGame.id },
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
  return result;
};

module.exports = createVideogame;
