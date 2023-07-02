import style from "./Estilos/Cards.module.css";
import Card from "./Card";

function Cards({ allVideogames }) {
  return (
    <div className={style.cards}>
      {allVideogames.map((game) => {
        return (
          <Card
            key={game.id}
            id={game.id}
            name={game.name}
            description={game.description}
            platforms={game.platforms}
            image={game.image}
            released={game.released}
            rating={game.rating}
            genres={
              game.created
                ? game.genres.map((gam) => gam.name).join(" - ")
                : game.genres.join(" - ")
            }
          />
        );
      })}
    </div>
  );
}

export default Cards;
