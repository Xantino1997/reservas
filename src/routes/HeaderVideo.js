import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./stylesPages/HeaderVideo.css";
import { UserContext } from "../UserContext";
import LogoViaje from "../assets/logoTravel.png";
import { useContext } from "react";
import profilePicture from "../assets/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Buscador from "./Buscador";
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

function HeaderVideo() {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(
    "https://cdn.pixabay.com/vimeo/230853032/coche-11490.mp4?width=1280&hash=9fa37df8dffcb2ab8760259ab51916604f2c7020"
  );

  const roles = userInfo ? userInfo.role : "guest";

  // Función para alternar la URL del video
  const toggleVideoUrl = () => {
    setVideoUrl((prevUrl) =>
      prevUrl ===
      "https://cdn.pixabay.com/vimeo/230853032/coche-11490.mp4?width=1280&hash=9fa37df8dffcb2ab8760259ab51916604f2c7020"
        ? "https://cdn.pixabay.com/vimeo/308135855/mar-20223.mp4?width=1280&hash=22764ac489456b69e324b9ae03be1303a235b951"
        : "https://cdn.pixabay.com/vimeo/230853032/coche-11490.mp4?width=1280&hash=9fa37df8dffcb2ab8760259ab51916604f2c7020"
    );
  };

  // Usar setInterval para alternar la URL cada 15 minutos
  useEffect(() => {
    const intervalId = setInterval(toggleVideoUrl, 15 * 60 * 1000); // 15 minutos en milisegundos

    // Limpia el interval cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleImageClick = () => {
    Swal.fire({
      icon: "info",
      title: "¿Deseas editar tu perfil?",
      showCancelButton: true,
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/register");
      }
    });
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-video">
      <div className="video-container-busqueda">
        <Buscador/>
      </div>
      <div className="video-overlay"></div>
      <div className="col-lg-2">
          <Link to="/" className="navbar-link text-light">
            <img className="navbar-imagen" src={LogoViaje} alt="Logo" />
          </Link>
        </div>
      <nav
        className={`navbar justify-content-around navbar-expand-lg navbar-light ${
          isMenuOpen ? "active" : ""
        }`}
      >
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
                <FontAwesomeIcon icon={faUsers} /> Sobre Nosotros
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
                    to="/suma-tu-servicio"
                    className="nav-link text-light nav-link-routes"
                    onClick={handleMenuToggle}
                  >
                    <FontAwesomeIcon icon={faHandshake} /> Suma tu servicio
                  </Link>
                </li>

            {roles === "user" && (
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
              
                <li className="nav-item">
                  <Link
                    to="/logout"
                    className="nav-link text-light nav-link-routes"
                    onClick={handleMenuToggle}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </Link>
                </li>
              </>
            )}

            {roles === "admin" && (
              <li className="nav-item">
                <Link
                  to="/subir-hotel-destino"
                  className="nav-link text-light nav-link-routes"
                  onClick={handleMenuToggle}
                >
                  <FontAwesomeIcon icon={faCloudUploadAlt} /> Subir
                  Hotel-Destino
                </Link>
              </li>
            )}

            {userInfo ? (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link text-light nav-link-routes"
                  onClick={handleMenuToggle}
                >
                  <FontAwesomeIcon icon={faSignInAlt} /> Iniciar sesión
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <img
                  src={profilePicture}
                  alt="Perfil"
                  className="perfil-img rounded-circle"
                  onClick={handleImageClick}
                />
              </li>
            )}
          </ul>
        </div>
      </nav>

      <video className="video-background" autoPlay loop muted>
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
        Tu navegador no admite la reproducción de video.
      </video>
    
    </header>
  );
}

export default HeaderVideo;
