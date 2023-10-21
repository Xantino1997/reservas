import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/404.css"
import Error from "./assets/error404.png";

const Page404 = () => {
  return (
    <div className="error-container">
      <img
        src={Error}
        alt="Error 404"
        className="error-image"
      />
      <h2>No se encontró la ruta especificada</h2>
      <Link to="/" className="home-link">
        Volver a Inicio
      </Link>
    </div>
  );
};

export default Page404;
