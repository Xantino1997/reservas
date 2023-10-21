import React, { useState, useEffect } from "react";
import "./stylesPages/IndexPage.css";
import HeaderVideo from "./HeaderVideo";
import Footer from "../Footer";
import { Link } from "react-router-dom";

function IndexPage() {
  const [products, setProducts] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://backend-reservas.vercel.app/products"); // Replace with your API endpoint
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlay) {
        setCurrentImage((prevImage) =>
          prevImage === products.length - 1 ? 0 : prevImage + 1
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, products.length]);

  const handleSelectImage = (index) => {
    setSelectedImage(index);
    setCurrentImage(index);
    setAutoPlay(false); // Detener la reproducción automática
    setTimeout(() => {
      setAutoPlay(true); // Reanudar la reproducción automática después de 15 segundos
    }, 15000);
  };


  return (
    <>
      <div className="container-viajes">
        <div className="overlay">
          <div className="header-video">
            <HeaderVideo />
            <div className="container-busqueda">
              <div className="select-image-div">
                {products.map((product, index) => (
                  <img
                    key={index}
                    className={`select-image ${
                      index === currentImage ? "active" : ""
                    }`}
                    src={product.imagen}
                    alt={`Select Image ${index + 1}`}
                    onClick={() => handleSelectImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          <h1 className="main-title">
            <q>Tu viaje empieza hoy</q>
          </h1>
        </div>
        <div className="container-carousel">
          <div className="carousel-index">
            {products.map((product, index) => (
              <div
                key={index}
                className={`carousel-item-index ${
                  index === currentImage ? "active" : ""
                }`}
                style={{
                  backgroundImage: `url(${product.imagen})`,
                  animationDelay: `${index * 0.8}s`,
                }}
              >
                <div className="carousel-content">
                  <div className="description-elementos">
                    <p
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        // overflow: "scroll",
                      }}
                    >
                      {product.description}
                    </p>
                    <p>{product.localidad}</p>
                    <h2 className="carousel-content-h5">{product.title}</h2>
                  </div>
                  <div className="description-elementos">
                    <p>Precio: {product.precio}</p>
                    <p>Descuento: {product.descuento}%</p>
                    <Link to={`/confirma-compra/${product._id}`} className="carousel-btn">
                      Ver detalles
                    </Link>
                    <br />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="select-image-div">
            {products.map((product, index) => (
              <img
                key={index}
                className={`select-image ${
                  index === currentImage ? "active" : ""
                }`}
                src={product.imagen}
                alt={`Select Image ${index + 1}`}
                onClick={() => handleSelectImage(index)}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default IndexPage;
