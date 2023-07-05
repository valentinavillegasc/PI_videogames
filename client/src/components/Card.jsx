import style from "./Estilos/Card.module.css";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <div className={style.card}>
      <Link className={style.name} to={`/detail/${props.id}`}>
        <p>{props.name}</p>
        <img src={props.image} alt={props.name} className={style.photo} />
      </Link>

      <p>
        <h5>Genres</h5> {props.genres}
      </p>
    </div>
  );
}

export default Card;
