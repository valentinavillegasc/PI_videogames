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
    event.preventDefault();
    axios
      .post("http://localhost:3001/videogames/", form)
      .then((res) => alert("Created!"))
      .catch((err) => alert("The creation failed"));
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
          {errors.name && <p className={style.errors}>{errors.name}</p>}

          <label htmlFor="">Game image: </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
          {errors.image && <p className={style.errors}>{errors.image}</p>}

          <label htmlFor="">Game description: </label>
          <textarea
            value={form.description}
            name="description"
            onChange={handleChange}
          />
          {errors.description && (
            <p className={style.errors}>{errors.description}</p>
          )}

          <label htmlFor="">Released date: </label>
          <input
            type="date"
            name="released"
            value={form.released}
            onChange={handleChange}
          />
          {errors.released && <p className={style.errors}>{errors.released}</p>}

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
        <h4>Please check the genres and platforms releated</h4>
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

        <button
          className={style.button}
          type="submit"
          disabled={Object.values(errors).some((error) => error !== "")}>
          Create
        </button>
      </form>
    </div>
  );
}

export default Form;
