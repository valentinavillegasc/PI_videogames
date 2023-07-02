import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import style from "./Estilos/NavBar.module.css";

/* import logo from "../utils/"; */
function NavBar() {
  return (
    <div className={style.navBar}>
      <SearchBar />
      <div className={style.logo}>{/*  <img src={logo} alt="logo" /> */}</div>
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
