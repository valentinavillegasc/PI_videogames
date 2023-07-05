import style from "./Estilos/Home.module.css";
import Cards from "../components/Cards";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Pagination from "../components/Pagination";
import {
  getVideogames,
  filterByGenre,
  filterBySource,
  orderByName,
  orderByRating,
} from "../redux/actions";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";

function Home() {
  //Hooks
  const videogames = useSelector((state) => state.videogames);
  const dispatch = useDispatch();
  useEffect(() => {
    //cuando el componente se monta
    dispatch(getVideogames());
  }, [dispatch]);

  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = videogames.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //HANDLERS
  //Filters
  const handleFilterGenres = (event) => {
    event.preventDefault();
    dispatch(filterByGenre(event.target.value));
    setCurrentPage(1);
  };

  const handleFilterSource = (event) => {
    event.preventDefault();
    dispatch(filterBySource(event.target.value));
    setCurrentPage(1);
  };
  //orders
  const handlerOrderAlphabet = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
  };
  const handlerOrderRaiting = (event) => {
    event.preventDefault();
    dispatch(orderByRating(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={style.home}>
      <NavBar />
      <div className={style.filtros}>
        <div>
          <h3 className={style.title}>Genres</h3>
          <select className={style.genres} onChange={handleFilterGenres}>
            <option value="All">All</option>
            <option value="Action">Action</option>
            <option value="Indie">Indie</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">Strategy</option>
            <option value="Shooter">Shooter</option>
            <option value="Casual">Casual</option>
            <option value="Simulation">Simulation</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Arcade">Arcade</option>
            <option value="Platformer">Platformer</option>
            <option value="Massively Multiplayer">Massively Multiplayer</option>
            <option value="Racing">Racing</option>
            <option value="Sports">Sports</option>
            <option value="Fighting">Fighting</option>
            <option value="Family">Family</option>
            <option value="Board Games">Board Games</option>
            <option value="Educational">Educational</option>
            <option value="Card">Card</option>
          </select>
        </div>
        <div>
          <h3 className={style.title}>Source</h3>
          <select className={style.source} onChange={handleFilterSource}>
            <option value="All">All</option>
            <option value="api">Api</option>
            <option value="created">Created</option>
          </select>
        </div>

        <div>
          <h3 className={style.title}>Name</h3>
          <select className={style.alpha} onChange={handlerOrderAlphabet}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>

        <div>
          <h3 className={style.title}>Rating</h3>
          <select className={style.rating} onChange={handlerOrderRaiting}>
            <option value="high-low">High-Low</option>
            <option value="low-high">Low-High</option>
          </select>
        </div>
      </div>
      <Cards allVideogames={currentItems} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={videogames.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}

export default Home;
