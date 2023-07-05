import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import style from "./Estilos/NavBar.module.css";

/* import logo from "../utils/"; */
function NavBar() {
  return (
    <div className={style.navBar}>
      <SearchBar />
      <Link to="/home">
        <div className={style.logo}>
          <h1 className={style.name}>GAMESTACK</h1>
          <img
            src=" https://chpic.su/_data/stickers/p/PacmanSPACK/PacmanSPACK_004.webp"
            alt="logo"
          />
        </div>
      </Link>

      <div>
        <Link to="/home">
          <button className={style.homeButton}>
            <span>Home</span>
          </button>
        </Link>
      </div>
      <div>
        <Link to="/form">
          <button className={style.createButton}>
            <span>Create</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
