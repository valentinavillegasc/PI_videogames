import React, { useEffect, useState } from "react";

import style from "./Estilos/Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../redux/actions";

import validation from "./validations/validations";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form() {
  //HOOKS
  const dispatch = useDispatch();
  let genres = useSelector((state) => state.genres);
  const navigate = useNavigate();

  //GENEROS Y PLATAFORMAS
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  let platforms = [
    "iOS",
    "Wii",
    "SEGA",
    "Xbox",
    "macOS",
    "Linux",
    "Android",
    "PC",
    "PlayStation",
    "Game Boy",
    "Nintendo Switch",
    "Nintendo DS",
  ];

  //ESTADOS
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: 0,
    genres: [],
    platforms: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: 0,
    genres: [],
    platforms: [],
  });

  //HANDLERS

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    setErrors(validation({ ...form, [property]: value }));
  };

  const handleClickPlatforms = (event) => {
    if (event.target.checked) {
      setForm({ ...form, platforms: [...form.platforms, event.target.value] });
    } else {
      setForm({
        ...form,
        platforms: form.platforms.filter(
          (platform) => platform !== event.target.value
        ),
      });
    }
  };

  const handleClickGenres = (event) => {
    if (event.target.checked) {
      setForm({ ...form, genres: [...form.genres, event.target.value] });
    } else {
      setForm({
        ...form,
        genres: form.genres.filter((genres) => genres !== event.target.value),
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //para que la pagina no se recarge y se pierda todo
    axios
      .post("http://localhost:3001/videogames/", form)
      .then((res) => alert("Created!"))
      .catch((err) => alert(err));
    navigate("/home");
  };
  return (
    <div>
      <form className={style.formulario} onSubmit={handleSubmit}>
        <div className={style.titulo}>
          <h1>Create a new videogame</h1>
        </div>
        <div className={style.form}>
          <label htmlFor="">Name of the videogame: </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}

          <label htmlFor="">Game image: </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
          {errors.image && <p>{errors.image}</p>}

          <label htmlFor="">Game description: </label>
          <textarea
            value={form.description}
            name="description"
            onChange={handleChange}
          />
          {errors.description && <p>{errors.description}</p>}

          <label htmlFor="">Released date: </label>
          <input
            type="text"
            name="released"
            value={form.released}
            onChange={handleChange}
          />
          {errors.released && <p>{errors.released}</p>}

          <label htmlFor="raiting">Raiting</label>
          <input
            type="number"
            value={form.rating}
            min="0"
            max="5"
            name="rating"
            onChange={handleChange}
          />
        </div>
        <div className={style.checkContainer}>
          <h2 className={style.genresTitle}>Genres</h2>
          <div className={style.genres}>
            {genres?.map((genre) => {
              return (
                <div>
                  <label htmlFor={genre.name} key={genre.id}>
                    {genre.name}
                  </label>
                  <input
                    type="checkbox"
                    name="genres"
                    id={genre.id}
                    value={genre.name}
                    onClick={handleClickGenres}
                  />
                </div>
              );
            })}
          </div>

          <h2 className={style.platformTitle}>Platforms</h2>
          <div className={style.platforms}>
            {platforms?.map((platform) => {
              return (
                <div>
                  <label htmlFor={platform}>{platform}</label>
                  <input
                    name="platforms"
                    type="checkbox"
                    value={platform}
                    onClick={handleClickPlatforms}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {errors.genres && <p>{errors.genres}</p>}
        {errors.platforms && <p>{errors.platforms}</p>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Form;
