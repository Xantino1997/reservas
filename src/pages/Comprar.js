import React, { useState, useEffect } from "react";
import "./stylesPages/Comprar.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://backend-reservas.vercel.app/products") // Ajusta la ruta según tu configuración
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  const firstFourProducts = products.slice(0, 4);
  const remainingProducts = products.slice(4);

  const comprar = (product) => {
    // Aquí puedes implementar la lógica para la acción de compra
    console.log(`Comprando ${product.title}`);
  };

  return (
    <div className="products-container">
      {firstFourProducts.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.imagen} alt={product.title} />
          <h2>{product.title}</h2>
          <h5 style={{ color: "green", fontSize: "18px" }}>${product.precio}</h5>
          <p>{product.description}</p>
          {product.descuento !== 0 && (
            <p className="discount-label">Descuento: {product.descuento}%</p>
          )}
          <button className="comprar-btn" onClick={() => comprar(product)}>
            Compre Ya!
          </button>
        </div>
      ))}
      <div className="remaining-products">
        {remainingProducts.map((product) => (
          <div key={product._id} className="product-card remaining">
            <img src={product.imagen} alt={product.title} />
            <h2>{product.title}</h2>
            <h5 style={{ color: "green", fontSize: "18px" }}>${product.precio}</h5>
            <p>{product.description}</p>
            {product.descuento !== 0 && (
              <p className="discount-label">Descuento: {product.descuento}%</p>
            )}
            <button className="comprar-btn" onClick={() => comprar(product)}>
              Compre Ya!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
