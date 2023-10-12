import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const handleReservasClick = () => {
  const isAuthenticated = true; // Cambia esto con tu lógica real de autenticación

  if (isAuthenticated) {
    // Usuario autenticado, redirige a la página de "Reservas"
    return <Link to="/suma-tu-servicio">Reserva</Link>;
  } else {
    // Usuario no autenticado, muestra un mensaje de confirmación
    const confirmMessage =
      "¿Desea ir a la página de reservas o iniciar sesión?";
    if (window.confirm(confirmMessage)) {
      // Redirige a la página de "Reservas" si el usuario confirma
      return <Link to="/suma-tu-servicio">Reservas</Link>;
    } else {
      // Redirige a la página de "Login" si el usuario cancela
      return <Link to="/google">Login</Link>;
    }
  }
};

const ResultadosBusqueda = ({
  resultados,
  mostrarResultados,
  onToggleResultados,
}) => {
  const [orden, setOrden] = useState("precio");
  const [resultadosFiltrados, setResultadosFiltrados] = useState(resultados);

  const ordenarResultados = (opcion) => {
    setOrden(opcion);

    const resultadosOrdenados = [...resultados].sort((a, b) => {
      if (opcion === "precio") {
        return a.precio - b.precio;
      } else if (opcion === "puntaje") {
        return b.puntaje - a.puntaje;
      }
      return 0;
    });

    setResultadosFiltrados(resultadosOrdenados);
  };

  return (
    <div className="resultados-container">
      {mostrarResultados ? (
        <div>
          <div className="ordenar">
            <label>Ordenar por:</label>
            <select onChange={(e) => ordenarResultados(e.target.value)}>
              <option value="precio">Precio (menor a mayor)</option>
              <option value="puntaje">Puntaje (1 a 5 estrellas)</option>
            </select>
          </div>
          <div className="resultados">
            {resultadosFiltrados.length > 0 ? (
              resultadosFiltrados.map((hotel, index) => (
                <div className="resultado" key={index}>
                  <h3>
                    <FontAwesomeIcon icon={faHotel} /> {hotel.nombre}
                  </h3>
                  <img
                    src={hotel.img}
                    alt={hotel.nombre}
                    style={{ width: "200px", height: "200px" }}
                  />
                  <p>Precio: ${hotel.precio}</p>
                  <p>Puntaje: {hotel.puntaje} estrellas</p>
                  <div>{handleReservasClick()}</div>
                </div>
              ))
            ) : (
              <p>No se encontraron resultados.</p>
            )}
          </div>
          <button onClick={onToggleResultados}>
            Cerrar
          </button>
        </div>
      ) : null}
      <button onClick={onToggleResultados}>
        Abrir
      </button>
    </div>
  );
};

export default ResultadosBusqueda;
