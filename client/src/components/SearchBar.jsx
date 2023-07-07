import style from "./Estilos/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../redux/actions";
import { useState } from "react";

function SearchBar() {
  //Hooks
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  //Handlers
  const onSearch = (event) => {
    event.preventDefault();
    dispatch(getVideogameByName(search));
  };
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className={style.SearchBar}>
      <input
        className={style.input}
        type="search"
        value={search}
        onChange={handleChange}
      />
      <button className={style.button} name="searchBar" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
