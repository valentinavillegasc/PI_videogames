import React from "react";
import { Link } from "react-router-dom";
import style from "./Estilos/Landing.module.css";

function Landing() {
  return (
    <div className={style.landing}>
      <img
        className={style.logo}
        src="https://chpic.su/_data/stickers/p/PacmanSPACK/PacmanSPACK_004.webp"
        alt="logo"
      />
      <h1 className={style.title}>GAMESTACK</h1>
      <Link to="/home">
        <button className={style.startButton}>Open library!</button>
      </Link>
    </div>
  );
}
export default Landing;
