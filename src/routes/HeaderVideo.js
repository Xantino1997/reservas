import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./stylesPages/HeaderVideo.css";
import { UserContext } from "../UserContext";
import LogoViaje from "../assets/logoTravel.png";
import { useContext } from "react";
import profilePicture from "../assets/user.png";
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
} from "@fortawesome/free-solid-svg-icons";

function HeaderVideo() {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  const roles = userInfo ? userInfo.role : "guest";

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
      <div className="video-container">
        <div className="col-lg-2">
          <Link to="/" className="navbar-brand text-light">
            <img src={LogoViaje} alt="Logo" />
          </Link>
        </div>
      </div>
      <div className="video-overlay"></div>
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
        <source
          src="https://cdn.pixabay.com/vimeo/230853032/coche-11490.mp4?width=1280&hash=9fa37df8dffcb2ab8760259ab51916604f2c7020"
          type="video/mp4"
        />
        <source
          src="https://cdn.pixabay.com/vimeo/230853032/coche-11490.mp4?width=1280&hash=9fa37df8dffcb2ab8760259ab51916604f2c7020"
          type="video/webm"
        />
        <source
          src="https://cdn.pixabay.com/vimeo/230853032/coche-11490.mp4?width=1280&hash=9fa37df8dffcb2ab8760259ab51916604f2c7020"
          type="video/ogg"
        />
        Tu navegador no admite la reproducción de video.
      </video>
      {/* <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-10"></div>
        </div>
      </div> */}
    </header>
  );
}

export default HeaderVideo;
