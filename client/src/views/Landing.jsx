import React from "react";
import { Link } from "react-router-dom";
import style from "./Estilos/Landing.module.css";

function Landing() {
  return (
    <div className={style.landing}>
      <h1 className={style.title}>GAMESTACK</h1>
      {/*   <h2 className={style.subtitle}>
        Welcome to your beloved video game collection!
      </h2> */}

      <Link to="/home">
        <button className={style.startButton}>Let's go!</button>
      </Link>
    </div>
  );
}
export default Landing;
