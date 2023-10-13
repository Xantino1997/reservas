import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./stylesPages/Buscador.css";
import "./stylesPages/ResultadosBusqueda.css";

import imageBusqueda from "../assets/imageBusqueda.png";
import imageBusqueda1 from "../assets/imageBusqueda1.png";
import imageBusqueda2 from "../assets/imageBusqueda2.png";
import imageBusqueda3 from "../assets/imageBusqueda3.png";
import imageBusqueda4 from "../assets/imageBusqueda4.png";
import hotelImg from "../assets/hotelImg.png";
import hotelImg2 from "../assets/hotelImg2.png";
import hotelImg3 from "../assets/hotelImg3.png";
import hotelImg4 from "../assets/hotelImg4.png";
import hotelImg5 from "../assets/hotelImg5.png";
import hotelImg6 from "../assets/hotelImg6.png";
import hotelImg7 from "../assets/hotelImg7.png";
import hotelImg8 from "../assets/hotelImg8.png";
import { Link } from "react-router-dom";

const Buscador = () => {
  const [busqueda, setBusqueda] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [resultados, setResultados] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const ordenarResultados = (tipoOrden) => {
    let resultadosCopia = [...resultados];
    let resultadosOrdenados = [];
    if (tipoOrden === "precio") {
      resultadosOrdenados = resultadosCopia.sort((a, b) => a.precio - b.precio);
    } else if (tipoOrden === "puntaje") {
      resultadosOrdenados = resultadosCopia.sort(
        (a, b) => b.puntaje - a.puntaje
      );
    }

    setResultados(resultadosOrdenados);
  };

  const handleSearch = () => {
    const resultadosDeBusqueda = [
      // Aquí debes llenar con datos reales o simulados de resultados
      {
        nombre: "Hotel Max Power1",
        precio: 100,
        puntaje: 4,
        img: hotelImg,
        disponibilidad: false,
        destino: "San Francisco",
        habitaciones: 13,
      },
      {
        nombre: "Hotel Resort 1",
        precio: 180,
        puntaje: 1,
        img: hotelImg,
        disponibilidad: true,
        destino: "Murcia",
        habitaciones: 6,
      },
      {
        nombre: "Hotel Resort 6",
        precio: 180,
        puntaje: 4,
        img: hotelImg8,
        disponibilidad: false,
        destino: "Murcia",
        habitaciones: 4,
      },
      {
        nombre: "Hotel Emperador 1",
        precio: 150,
        puntaje: 3,
        img: hotelImg2,
        disponibilidad: false,
        destino: "Murcia",
        habitaciones: 41,
      },
      {
        nombre: "Resort 3",
        precio: 120,
        puntaje: 5,
        img: hotelImg3,
        destino: "Destino1",
        disponibilidad: false,
        habitaciones: 1,
      },
      {
        nombre: "Gastronomico 1",
        precio: 100,
        puntaje: 4,
        img: hotelImg4,
        destino: "Chovet",
        disponibilidad: false,
        habitaciones: 4,
      },
      {
        nombre: "Hotel 2",
        precio: 150,
        puntaje: 3,
        img: hotelImg5,
        destino: "Eritrea",
        disponibilidad: true,
        habitaciones: 4,
      },
      {
        nombre: "Hotel Emperador2",
        precio: 120,
        puntaje: 5,
        img: hotelImg6,
        destino: "Pergamino",
        disponibilidad: false,
        habitaciones: 14,
      },
      {
        nombre: "Hotel 1",
        precio: 100,
        puntaje: 4,
        img: hotelImg7,
        destino: "Firmat",
        disponibilidad: true,
        habitaciones: 24,
      },
      {
        nombre: "Hotel Elimar",
        precio: 150,
        puntaje: 3,
        img: hotelImg8,
        destino: "Santa fe",
        disponibilidad: true,
        habitaciones: 5,
      },
      {
        nombre: "Hotel San Marino",
        precio: 120,
        puntaje: 5,
        img: hotelImg,
        destino: "Francia",
        disponibilidad: false,
        habitaciones: 41,
      },
    ];

    const resultadosFiltrados = resultadosDeBusqueda.filter((hotel) => {
      const buscaDestino = hotel.destino
        .toLowerCase()
        .includes(busqueda.toLowerCase());
      const buscaNombre = hotel.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());
      return buscaDestino || buscaNombre;
    });

    const resultadosOrdenados = resultadosFiltrados.sort((a, b) => {
      if (a.disponibilidad === b.disponibilidad) {
        return 0;
      }
      if (a.disponibilidad) {
        return -1;
      }
      return 1;
    });

    setResultados(resultadosOrdenados);
    setMostrarResultados(true);
  };

  const cerrarResultados = () => {
    setMostrarResultados(false);
  };

  return (
    <div className="buscador-container">
      <div className="div-seleccion">
        <h1 className="div-seleccion-titulo">Viaja por el Mundo</h1>
        <div className="img-container">
          <img className="img-seleccion" src={imageBusqueda1} alt="Imagen 1" />
          <img className="img-seleccion" src={imageBusqueda2} alt="Imagen 2" />
        </div>
        <div className="img-container">
          <img className="img-seleccion" src={imageBusqueda3} alt="Imagen 3" />
          <img className="img-seleccion" src={imageBusqueda4} alt="Imagen 4" />
        </div>
      </div>

      <div className="busqueda-general">
        <div className="busqueda">
          <input
            type="text"
            placeholder="Ingresa nombre o ciudad..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="fechas">
          <img
            className="img-seleccion-busqueda"
            src={imageBusqueda}
            alt="Imagen seleccion"
          />
        </div>
      </div>
      {mostrarResultados && (
        <div className="resultados-container">
          <div className="cerrar-ver">
            <button className="" onClick={cerrarResultados}>
              Cerrar
            </button>
            <button className="" onClick={() => setMostrarTodos(!mostrarTodos)}>
              {mostrarTodos ? "Ver menos" : "Ver todos"}
            </button>
          </div>

          <div className="resultados">
            {mostrarTodos
              ? [...resultados]
                  .sort((a, b) =>
                    a.disponibilidad === b.disponibilidad
                      ? 0
                      : a.disponibilidad
                      ? -1
                      : 1
                  )
                  .map((hotel, index) => (
                    <div className="resultado" key={index}>
                      <h3>{hotel.nombre}</h3>
                      <img
                        src={hotel.img}
                        alt={hotel.nombre}
                        style={{ width: "200px", height: "200px" }}
                      />
                      <p>Precio: ${hotel.precio}</p>
                      <p>Puntaje: {hotel.puntaje} estrellas</p>
                      <p>
                        Disponibilidad:{" "}
                        <span
                          style={{
                            color: hotel.disponibilidad ? "green" : "red",
                          }}
                        >
                          {hotel.disponibilidad ? "Si" : "No"}
                        </span>
                      </p>
                      <p>
                        Localidad:
                        <span>{hotel.destino}</span>
                      </p>
                      {hotel.disponibilidad ? (
                        <p>{hotel.habitaciones} habitaciones disponibles</p>
                      ) : (
                        <p>No hay habitaciones disponibles</p>
                      )}
                      <Link to="/suma-tu-servicio" className="reservas-buttom">
                        Reserva
                      </Link>
                    </div>
                  ))
              : resultados.slice(0, 5).map((hotel, index) => (
                  <div className="resultado" key={index}>
                    <h3>{hotel.nombre}</h3>
                    <img
                      src={hotel.img}
                      alt={hotel.nombre}
                      style={{ width: "200px", height: "200px" }}
                    />
                    <p>Precio: ${hotel.precio}</p>
                    <p>Puntaje: {hotel.puntaje} estrellas</p>

                    <p>
                      Disponibilidad:{" "}
                      <span
                        style={{
                          color: hotel.disponibilidad ? "black" : "red",
                        }}
                      >
                        {hotel.disponibilidad ? "Si" : "No"}
                      </span>
                    </p>
                    <p>
                      Localidad:
                      <span>{hotel.destino}</span>
                    </p>
                    {hotel.disponibilidad ? (
                      <p>{hotel.habitaciones} habitaciones disponibles</p>
                    ) : (
                      <p>No hay habitaciones disponibles</p>
                    )}
                    <Link to="/suma-tu-servicio" className="reservas-buttom">
                      Reserva
                    </Link>
                  </div>
                ))}
          </div>

          <div className="cerrar-ver">
            <div className="ordenar-container">
              <div className="ordenar">
                <label>Ordenar por:</label>
                <select onChange={(e) => ordenarResultados(e.target.value)}>
                  <option value="precio">Precio (menor a mayor)</option>
                  <option value="puntaje">Puntaje (1 a 5 estrellas)</option>
                </select>
              </div>
            </div>
            <div className="ordenar-cerrar">
              <button
                className="cerrar-ver-btn"
                onClick={() => setMostrarTodos(!mostrarTodos)}
              >
                {mostrarTodos ? "Ver menos" : "Ver todos"}
              </button>
              <button className="cerrar-ver-btn" onClick={cerrarResultados}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buscador;
