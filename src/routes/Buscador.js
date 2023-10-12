import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./stylesPages/Buscador.css";
import "./stylesPages/ResultadosBusqueda.css";

import imageBusqueda from "../assets/imageBusqueda.png";
import hotelImg from "../assets/hotelImg.png";
import hotelImg2 from "../assets/hotelImg2.png";
import hotelImg3 from "../assets/hotelImg3.png";
import hotelImg4 from "../assets/hotelImg4.png";
import hotelImg5 from "../assets/hotelImg5.png";
import hotelImg6 from "../assets/hotelImg6.png";
import hotelImg7 from "../assets/hotelImg7.png";
import hotelImg8 from "../assets/hotelImg8.png";

const Buscador = () => {
  const [busqueda, setBusqueda] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [hotel, setHotel] = useState("");
  const [destino, setDestino] = useState("");
  const [resultados, setResultados] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleSearch = () => {
    // Lógica de búsqueda y actualización de resultados aquí...
    // Debes llenar resultadosDeBusqueda con los datos reales o simulados.

    // Luego, actualiza el estado de resultados.
    const resultadosDeBusqueda = [
      // Aquí debes llenar con datos reales o simulados de resultados
      { nombre: "Hotel Max Power1", precio: 100, puntaje: 4, img: hotelImg },
      { nombre: "Hotel Emperador 1", precio: 150, puntaje: 3, img: hotelImg2 },
      { nombre: "Resort 3", precio: 120, puntaje: 5, img: hotelImg3 },
      { nombre: "Gastronomico 1", precio: 100, puntaje: 4, img: hotelImg4 },
      { nombre: "Hotel 2", precio: 150, puntaje: 3, img: hotelImg5 },
      { nombre: "Hotel Emperador2", precio: 120, puntaje: 5, img: hotelImg6 },
      { nombre: "Hotel 1", precio: 100, puntaje: 4, img: hotelImg7 },
      { nombre: "Hotel Elimar", precio: 150, puntaje: 3, img: hotelImg8 },
      { nombre: "Hotel San ", precio: 120, puntaje: 5, img: hotelImg },
    ];

    setResultados(resultadosDeBusqueda);
    setMostrarResultados(true); // Establecemos mostrarResultados en true al realizar la búsqueda
  };

  const cerrarResultados = () => {
    setMostrarResultados(false); // Ocultamos los resultados
  };

  return (
    <div className="buscador-container">
      <div className="div-seleccion">
        <img
          className="img-seleccion small"
          src={imageBusqueda}
          alt="Imagen seleccion"
        />
      </div>
      <div className="busqueda-general">
        <div className="busqueda">
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="fechas">
          <input
            type="date"
            placeholder="Fecha de inicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <input
            type="date"
            placeholder="Fecha de fin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
        <div className="seleccion">
          <select value={hotel} onChange={(e) => setHotel(e.target.value)}>
            <option value="">Seleccionar hotel</option>
            <option value="hotel1">Hotel 1</option>
            <option value="hotel2">Hotel 2</option>
            {/* Agrega más opciones aquí */}
          </select>
          <select value={destino} onChange={(e) => setDestino(e.target.value)}>
            <option value="">Seleccionar destino</option>
            <option value="destino1">Destino 1</option>
            <option value="destino2">Destino 2</option>
            {/* Agrega más opciones aquí */}
          </select>
        </div>
      </div>
      {mostrarResultados && (
        <div className="resultados-container">
          <div className="resultados">
            {resultados.length > 0 ? (
              resultados.map((hotel, index) => (
                <div className="resultado" key={index}>
                  <h3>{hotel.nombre}</h3>
                  <img
                    src={hotel.img}
                    alt={hotel.nombre}
                    style={{ width: "200px", height: "200px" }}
                  />
                  <p>Precio: ${hotel.precio}</p>
                  <p>Puntaje: {hotel.puntaje} estrellas</p>
                </div>
              ))
            ) : (
              <p>No se encontraron resultados.</p>
            )}
          </div>
          <button onClick={cerrarResultados}>Cerrar</button>

        </div>
      )}
    </div>
  );
};

export default Buscador;
