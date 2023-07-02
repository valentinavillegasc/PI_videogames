import React, { useEffect } from "react";
import style from "./Estilos/Detail.module.css";
import { useDispatch } from "react-redux";
import { getVideogame, cleanDetail } from "../redux/actions";
import { useParams } from "react-router-dom";

function Detail({ game }) {
  const params = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideogame(params.id));
    return () => {
      //se ejecuta cuando el componente se desmonta
      dispatch(cleanDetail());
    };
  }, [dispatch, params.id]);

  return (
    <div className={style.detail}>
      <h1>{game.name}</h1>

      <div className={style.info}>
        <img src={game.image} alt={game.name} className={style.img} />
        <div className={style.info2}>
          <p>
            <h4>Rating</h4>
            {game.rating}
          </p>

          <p>
            <h4>Genres</h4>
            {game.created
              ? game.genres.map((gam) => gam.name).join(" - ")
              : game.genres?.join(" - ")}
          </p>

          <p>
            <h4>Released</h4>
            {game.released}
          </p>

          <p>
            <h4>Platforms</h4>
            {game.platforms?.join(" - ")}
          </p>
        </div>
      </div>
      <div className={style.description}>
        <h2>About</h2>
        <p dangerouslySetInnerHTML={{ __html: game?.description }}></p>
      </div>
    </div>
  );
}
/*  */

export default Detail;
