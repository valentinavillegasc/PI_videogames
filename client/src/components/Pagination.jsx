import React from "react";
import style from "./Estilos/Pagination.module.css";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    //Se generan los numeros de las paginas
    pageNumbers.push(i);
  }

  return (
    <div className={style.pagination}>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>{" "}
            {/* por cada click, se ejecuta la funcion paginate pasandole el numero de la pagina */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
