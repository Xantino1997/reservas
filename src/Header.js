import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./styles/Header.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { UserContext } from "./UserContext";
import LogoViaje from "./assets/logoTravel.png";
import { useContext } from "react";
import user from "./assets/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faBullhorn,
  faSuitcase,
  faPlane,
  faSignOutAlt,
  faSignInAlt,
  faCloudUploadAlt,
  faHandshake, // Importar el icono de manos estrechadas
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  // const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const roles = userInfo ? userInfo.role : "guest";
  const totalReservas = 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(null);
    window.location.href = "/";
  };

  useEffect(() => {
    fetch(`https://backend-reservas.vercel.app/profile`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hubo un problema al obtener los datos del perfil");
        }
        return response.json();
      })
      .then((userInfo) => {
        setUserInfo(userInfo);
        console.log("Respuesta del servidor:", userInfo); // Imprimir la respuesta del servidor en la consola
      })
      .catch((error) => {
        console.error("Error al obtener datos de perfil:", error);
      });
  }, []);

  async function logout() {
    try {
      await fetch("https://backend-reservas.vercel.app/logout", {
        credentials: "include",
        method: "POST",
      });

      setUserInfo(null);

      setRedirect(true);
      Swal.fire({
        title: `¡Hasta luego, ${userInfo.username}!`,
        icon: "success",
        timer: 5000,
        showConfirmButton: false,
      }).then(() => {
        // Limpiar el usuario de UserContext (ajusta esto según tu implementación)
        setUserInfo(""); // Esto depende de cómo se implementó el contexto de usuario en tu aplicación
        // navigate("/redirigiendo");
      });
    } catch (error) {
      console.error("Error:", error);
      // Mostrar mensaje de error si ocurre un error inesperado
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al cerrar sesión",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  // useEffect(() => {
  //   if (redirect) {
  //     navigate("/redirigiendo");
  //   }
  // }, [redirect]);

  const username = userInfo?.username;
  const profilePicture = userInfo?.profilePicture || user;
  const role = userInfo?.role || "role not specified";

  const handleImageClick = () => {
    Swal.fire({
      icon: "info",
      title: "¿Deseas editar tu perfil?",
      showCancelButton: true,
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirigir a la página de edición de perfil usando useNavigate
        // navigate("/register");
      }
    });
  };
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      {/* <div className="container">
        <div className="row align-items-center">
        </div>
      </div> */}

      <div className="col-lg-10"></div>

      <nav
        className={`navbar-header justify-content-around navbar-expand-lg navbar-light ${
          isMenuOpen ? "active" : ""
        }`}
      >
        <div className="col-lg-2">
          <Link to="/" className="navbar-link text-light">
            <img className="navbar-imagen" src={LogoViaje} alt="Logo" />
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleMenuToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link text-light nav-link-routes"
                onClick={handleMenuToggle}
              >
                <FontAwesomeIcon icon={faHome} /> Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/sobre-nosotros"
                className="nav-link text-light nav-link-routes"
                onClick={handleMenuToggle}
              >
                <FontAwesomeIcon icon={faUsers} /> About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/novedades"
                className="nav-link text-light nav-link-routes"
                onClick={handleMenuToggle}
              >
                <FontAwesomeIcon icon={faBullhorn} /> Novedades
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/reservas"
                className="nav-link text-light nav-link-routes"
                onClick={handleMenuToggle}
              >
                <FontAwesomeIcon icon={faSuitcase} /> Reservas
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/comprar"
                className="nav-link text-light nav-link-routes"
                onClick={handleMenuToggle}
              >
                <FontAwesomeIcon icon={faHandshake} /> Viaja
              </Link>
            </li>

            {role === "userclient" && (
              <>
                <li className="nav-item">
                  <Link
                    to="/tus-reservas"
                    className="nav-link text-light nav-link-routes"
                    onClick={handleMenuToggle}
                  >
                    <FontAwesomeIcon icon={faPlane} /> Tus Reservas
                  </Link>
                </li>
              </>
            )}

            {role === "Admin" && (
              <>
                <li className="nav-item">
                  <Link
                    to="/subir-hotel-destino"
                    className="nav-link text-light nav-link-routes"
                    onClick={handleMenuToggle}
                  >
                    <FontAwesomeIcon icon={faCloudUploadAlt} /> Cargar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/reservas"
                    className="nav-link text-light nav-link-routes"
                    onClick={handleMenuToggle}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                  >
                    <FontAwesomeIcon icon={faSuitcase} />
                    Total reservas:
                    <div
                      style={{
                        background: totalReservas > 0 ? "#099c1d" : "red",
                        borderRadius: "50%",
                        color: totalReservas === 0 ? "#fff" : "#fff",
                        border: "2px solid #fff",
                        width: "50px", // Ajusta el ancho según sea necesario
                        height: "50px", // Ajusta la altura según sea necesario
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "5px", // Ajusta el margen izquierdo según sea necesario
                      }}
                    >
                      {totalReservas}
                    </div>
                  </Link>
                </li>
              </>
            )}

            {username ? (
              <>
                <div className="container-profilePicture">
                  <li className="nav-item">
                    <img
                      src={profilePicture}
                      alt="Perfil"
                      className="perfil-img rounded-circle"
                      onClick={handleImageClick}
                    />
                  </li>
                  <p>{username}</p>
                </div>
                <li className="nav-item">
                  <Link
                    to="/logout"
                    className="nav-link text-light nav-link-routes"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link text-light nav-link-routes"
                  onClick={handleMenuToggle}
                >
                  <FontAwesomeIcon icon={faSignInAlt} /> Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
