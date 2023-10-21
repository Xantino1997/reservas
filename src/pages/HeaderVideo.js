import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./stylesPages/HeaderVideo.css";
import { UserContext } from "../UserContext";
import LogoViaje from "../assets/logoTravel.png";
import { useContext } from "react";
import user from "../assets/user.png";
import hotel25 from "../assets/destino1.png";
import hotel26 from "../assets/destino2.png";
import hotel27 from "../assets/destino3.png";
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
  faHandshake,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";

function HeaderVideo() {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(
    "https://cdn.pixabay.com/vimeo/230853032/coche-11490.mp4?width=1280&hash=9fa37df8dffcb2ab8760259ab51916604f2c7020"
  );
  const [products, setProducts] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentImageBuscar, setCurrentImageBuscar] = useState(0);

  const images = [
    hotel25, // Ruta de la primera imagen
    hotel26, // Ruta de la segunda imagen
    hotel27 // Ruta de la tercera imagen
  ];
  
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageBuscar((prevImage) => (prevImage + 1) % images.length);
      }, 5000);
  
      return () => clearInterval(interval);
    }, [images.length]);
  
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://backend-reservas.vercel.app/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data.slice(0, 6)); // Mostrar los primeros 6 elementos inicialmente
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSelectImage = (index) => {
    setCurrentImage(index);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://backend-reservas.vercel.app/products?searchTerm=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();

      let filteredData = data;
      if (searchTerm) {
        filteredData = data.filter((product) =>
          product.localidad.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filteredData.length > 0) {
        // Ordenar por precio de manera predeterminada
        filteredData.sort((a, b) => a.precio - b.precio);
      }

      setFilteredProducts(filteredData); // Mostrar los elementos que coinciden con la búsqueda
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const handleSortByPrice = () => {
    const sortedProducts = [...filteredProducts].sort(
      (a, b) => b.precio - a.precio
    );
    setFilteredProducts(sortedProducts);
  };

  const handleSortByDiscount = () => {
    const sortedProducts = [...filteredProducts].sort(
      (a, b) => b.descuento - a.descuento
    );
    setFilteredProducts(sortedProducts);
  };
  const roles = userInfo ? userInfo.role : "guest";
  const totalReservas = 15;

  const username = userInfo?.username;
  const profilePicture = userInfo?.profilePicture || user;
  const role = userInfo?.role || "role not specified";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(null);
    window.location.href = "/";
  };

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
      <div className="video-overlay">
        <div className="container-busqueda">
          <div className="search-container">
            <input
              className="buscador-viaje"
              type="text"
              placeholder="Buscar por localidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="button-buscar" onClick={handleSearch}>
              Buscar
            </button>
            <div className="buscar-container" style={{ backgroundImage: `url(${images[currentImageBuscar]})` }}>
            <img className="buscar-container-image" src={images[currentImageBuscar]} alt="Search image"/>
            </div>
            <div className="select-option">
              <h3>Ordenar por precio:</h3>
              <select onChange={handleSortByPrice}>
                <option value="desc">De mayor a menor</option>
                <option value="asc">De menor a mayor</option>
              </select>

              <h3>Ordenar por descuento:</h3>
              <select onChange={handleSortByDiscount}>
                <option value="desc">De mayor a menor</option>
                <option value="asc">De menor a mayor</option>
              </select>
            </div>
          </div>
          <div className="select-image-div">
            {filteredProducts.length ? (
              filteredProducts.slice(0, 3).map((product, index) => (
                <div key={index} className="product-item">
                  <img
                    className={`select-image`}
                    src={product.imagen}
                    alt={`Select Image ${index + 1}`}
                    onClick={() => handleSelectImage(index)}
                  />
                  <div className="product-details">
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>Localidad: {product.localidad}</p>
                    <p>
                      Precio: {product.precio} (Descuento:
                      {product.descuento}%)
                    </p>
                  </div>
                  <Link
                    to={`/confirma-compra/${product._id}`}
                    className="buy-button"
                  >
                    Comprar
                  </Link>
                </div>
              ))
            ) : (
              <h4
                style={{
                  color: "#fff",
                }}
              >
                Lo siento, no se encontró la localidad.
              </h4>
            )}
          </div>
          <Link to={`/comprar`} className="buy-button">
            Ver mas destinos
          </Link>
        </div>
      </div>

      <nav
        className={`navbar navbar-expand-lg navbar-light ${
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
                <FontAwesomeIcon
                  icon={faHome}
                  style={{ marginRight: "10px" }}
                />{" "}
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/sobre-nosotros"
                className="nav-link text-light nav-link-routes"
                onClick={handleMenuToggle}
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  style={{ marginRight: "10px" }}
                />
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/novedades"
                className="nav-link text-light nav-link-routes"
                onClick={handleMenuToggle}
              >
                <FontAwesomeIcon
                  icon={faBullhorn}
                  style={{ marginRight: "10px" }}
                />
                Novedades
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/consumo"
                className="nav-link text-light nav-link-routes"
                onClick={handleMenuToggle}
              >
                <FontAwesomeIcon icon={faPiggyBank}
                  style={{ marginRight: "10px" }}
                />
                Consumo
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/reservas"
                className="nav-link text-light nav-link-routes"
                onClick={handleMenuToggle}
              >
                <FontAwesomeIcon
                  icon={faSuitcase}
                  style={{ marginRight: "10px" }}
                />{" "}
                Reservas
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/comprar"
                className="nav-link text-light nav-link-routes"
                onClick={handleMenuToggle}
              >
                <FontAwesomeIcon
                  icon={faHandshake}
                  style={{ marginRight: "10px" }}
                />{" "}
                Viaja
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
                    <FontAwesomeIcon
                      icon={faPlane}
                      style={{ marginRight: "10px" }}
                    />{" "}
                    Tus Reservas
                  </Link>
                </li>
              </>
            )}

            {role === "Admin" && (
              <>
                <li className="nav-item">
                  <Link
                    to="/comprar-edit"
                    className="nav-link text-light nav-link-routes"
                    onClick={handleMenuToggle}
                  >
                    <FontAwesomeIcon
                      icon={faHandshake}
                      style={{ marginRight: "10px" }}
                    />{" "}
                    Edit Viaja
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/subir-hotel-destino"
                    className="nav-link text-light nav-link-routes"
                    onClick={handleMenuToggle}
                  >
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      style={{ marginRight: "10px" }}
                    />{" "}
                    Cargar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/reservas"
                    className="nav-link text-light nav-link-routes"
                    onClick={handleMenuToggle}
                  >
                    <FontAwesomeIcon
                      icon={faSuitcase}
                      style={{ marginRight: "10px" }}
                    />
                    Total reservas: {totalReservas}
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
                    to="/#"
                    className="nav-link text-light nav-link-routes"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      style={{ marginRight: "10px" }}
                    />{" "}
                    Logout
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
                  <FontAwesomeIcon
                    icon={faSignInAlt}
                    style={{ marginRight: "10px" }}
                  />{" "}
                  Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <video className="video-background" autoPlay loop muted>
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
        <p>Tu navegador no admite la reproducción de video.</p>
      </video>
    </header>
  );
}

export default HeaderVideo;
