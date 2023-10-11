import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./stylesPages/HeaderVideo.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { UserContext } from "../UserContext";
import user from "../assets/user.png";
import LogoViaje from "../assets/logoTravel.png";
import { useContext } from "react";

function HeaderVideo() {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  // const { setUserInfo, user } = useUserContext(useUserContext);
  useEffect(() => {
    fetch(
      // `http://localhost:4000/profile`
      {
        credentials: "include",
      }
    ).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  async function logout() {
    try {
      await fetch("http://localhost:4000/logout", {
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
        navigate("/redirigiendo");
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

  useEffect(() => {
    if (redirect) {
      navigate("/redirigiendo");
    }
  }, [redirect]);

  const username = userInfo?.username;
  const profilePicture = userInfo?.profilePicture || user;

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
        navigate("/register");
      }
    });
  };
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-video">
      <div className="container">
        <div className="row align-items-center">
          <div className="video-container">
            <div className="col-lg-2">
              <Link to="/" className="navbar-brand text-light">
                <img src={LogoViaje} />
              </Link>
            </div>
            <video className="video-background" autoPlay loop muted>
              <source
                src="https://v4.cdnpk.net/videvo_files/video/free/video0468/small_watermarked/_import_616524809f7f55.30049848_FPpreview.mp4"
                type="video/mp4"
              />
              <source
                src="https://v4.cdnpk.net/videvo_files/video/free/video0468/small_watermarked/_import_616524809f7f55.30049848_FPpreview.mp4"
                type="video/webm"
              />
              <source
                src="https://v4.cdnpk.net/videvo_files/video/free/video0468/small_watermarked/_import_616524809f7f55.30049848_FPpreview.mp4"
                type="video/ogg"
              />
              Tu navegador no admite la reproducción de video.
            </video>
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
                <ul className="navbar-nav ml-auto ">
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-link text-light"
                      onClick={handleMenuToggle}
                    >
                      Inicio
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/sobre-nosotros"
                      className="nav-link text-light"
                      onClick={handleMenuToggle}
                    >
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/noticias"
                      className="nav-link text-light"
                      onClick={handleMenuToggle}
                    >
                      Noticias
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/comunidades"
                      className="nav-link text-light"
                      onClick={handleMenuToggle}
                    >
                      Comunidades
                    </Link>
                  </li>
                  {/* Agregar más elementos del menú aquí */}
                  {username ? (
                    <>
                      <li className="nav-item">
                        <Link
                          to="/crear-post"
                          className="nav-link text-light"
                          onClick={handleMenuToggle}
                        >
                          Crear Post
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/subir-video"
                          className="nav-link text-light"
                          onClick={handleMenuToggle}
                        >
                          Subir video
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="#"
                          className="nav-link text-light"
                          onClick={() => {
                            logout();
                            handleMenuToggle();
                          }}
                        >
                          Logout
                        </Link>
                      </li>
                      <li className="nav-item">
                        <img
                          src={profilePicture}
                          alt="Autor"
                          className="autor-info-header-img rounded-circle"
                          onClick={handleImageClick}
                        />
                      </li>
                    </>
                  ) : (
                    <li className="nav-item">
                      <Link
                        to="/login"
                        className="nav-link text-light"
                        onClick={handleMenuToggle}
                      >
                        Iniciar sesión
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>
          <div className="col-lg-10"></div>
        </div>
      </div>
    </header>
  );
}

export default HeaderVideo;
