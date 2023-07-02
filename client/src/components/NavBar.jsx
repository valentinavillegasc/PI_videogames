import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import style from "./Estilos/NavBar.module.css";
import { useDispatch } from "react-redux";

function NavBar() {
  return (
    <div className={style.navBar}>
      <SearchBar />
      <div className={style.logo}>
        <img src="./utils/Logo.png" alt="logo" />
      </div>
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
