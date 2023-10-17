import React, { useState, useEffect } from "react";
import "./stylesPages/Comprar.css";
import LogoViaje from "../assets/logoTravel.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // /
    // http://localhost:4000
    fetch("https://backend-reservas.vercel.app/products") 
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  const firstFourProducts = products.slice(0, 4);
  const remainingProducts = products.slice(4);

  const comprar = (product) => {
    if (product.quantity <= 0) {
      Swal.fire({
        title: "Lo sentimos",
        text: "Este producto está agotado. Pronto estará disponible de nuevo.",
        icon: "info",
      });
    } else {
      console.log(`Comprando ${product.title}`);
      const productId = product._id; // Asegúrate de obtener el ID correcto del producto

      // Redirige al usuario a la ruta confirma-compra con el ID del producto
      navigate(`/confirma-compra/${productId}`);
    }
  };

  return (
    <div className="products-container">
      {firstFourProducts.map((product) => (
        <div key={product._id} className="product-card">
          <div className="product-quantity">
            {product.quantity <= 0 ? (
              <small className="quantity-text-low" style={{ color: "red" }}>
                Agotados
              </small>
            ) : product.quantity <= 3 ? (
              <small className="quantity-text-low">
                Proximo a terminarse: {product.quantity}
              </small>
            ) : (
              <small className="quantity-text-high">
                Disponibles: {product.quantity}
              </small>
            )}
          </div>
          <img
            src={product.imagen ? product.imagen : LogoViaje}
            alt={product.title}
          />

          <h2>{product.title}</h2>
          <h5 style={{ color: "green", fontSize: "18px" }}>
            ${product.precio}
          </h5>
          <p>{product.description}</p>
          {product.descuento !== 0 && (
            <p className="discount-label">Descuento: {product.descuento}</p>
          )}
          <div className="container-comprar-btn">
            <button className="comprar-btn" onClick={() => comprar(product)}>
              Compre Ya!
            </button>
          </div>
        </div>
      ))}

      <div className="remaining-products">
        {remainingProducts.map((product) => (
          <div key={product._id} className="product-card remaining">
            <div className="product-quantity">
              {product.quantity <= 3 ? (
                <small className="quantity-text-low">
                  Proximo a terminarse: {product.quantity}
                </small>
              ) : (
                <small className="quantity-text-high">
                  Disponibles: {product.quantity}
                </small>
              )}
            </div>
            <img
              src={product.imagen ? product.imagen : LogoViaje}
              alt={product.title}
            />
            <h2>{product.title}</h2>
            <h5 style={{ color: "green", fontSize: "18px" }}>
              ${product.precio}
            </h5>
            <p>{product.description}</p>
            {product.descuento !== 0 && (
              <p className="discount-label">Descuento: {product.descuento}%</p>
            )}
            <div className="container-comprar-btn">
              <button className="comprar-btn" onClick={() => comprar(product)}>
                Compre Ya!
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
