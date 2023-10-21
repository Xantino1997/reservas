import React, { useState } from "react";
import "./SubirProductos.css";
import LogoViaje from "../assets/logoTravel.png";
import Swal from "sweetalert2";

const SubirCompra = () => {
  const maxDescriptionLength = 200;
  const [products, setProducts] = useState([
    {
      title: "Titulo",
      description: "Descripcion",
      precio: 0,
      descuento: 0,
      quantity: 0,
      imagen: null,
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    precio: 0,
    descuento: 0,
    quantity: 0,
    imagen: null,
  });

  const enviarDatosAlBackend = async () => {
    try {
      const response = await fetch("https://backend-reservas.vercel.app/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire("Éxito", "Producto subido con éxito", "success");
      } else {
        Swal.fire("Error", "Error al subir el producto", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Error al subir el producto", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > maxDescriptionLength) {
      return;
    }
    if (name === "localidad") {
      setNewProduct({ ...newProduct, localidad: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };
  

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setNewProduct({ ...newProduct, imagen: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="cargar-container">
      {products.map((product, index) => (
        <div key={index} className="product-card-cargar">
          <div className="product-quantity">
            <small className="quantity-text-low" style={{ color: "green" }}>
              {newProduct.quantity === 0
                ? "Agotados"
                : `Disponibles: ${newProduct.quantity}`}
            </small>
          </div>
          <img
            className="image-cargar"
            src={newProduct.imagen ? newProduct.imagen : LogoViaje}
            alt={newProduct.title}
          />

          <h2>Título: {newProduct.title}</h2>
          <p
            className="description-cargar"
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflow: "scroll",
            }}
          >
            {newProduct.description}
          </p>
          <p style={{ color: "green", fontSize: "18px" }}>
            precio: ${newProduct.precio}
          </p>

          <p className="discount-label">Descuento: {newProduct.descuento}</p>
        </div>
      ))}
      <div className="agregar-productos-container">
        <h2>Agregar Producto</h2>
        <form className="cargar-productos">
          <label htmlFor="title">Título:</label>
          <br />
          <input
            type="text"
            className="input-edit"
            placeholder="Título"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="description">Descripción:</label>
          <br />
          <input
            type="text"
            className="input-edit"
            placeholder="Descripción"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            maxLength={maxDescriptionLength}
          />
          <br />
          <small
            style={{
              color: newProduct.description.length > 150 ? "red" : "black",
            }}
          >
            {newProduct.description.length}/{maxDescriptionLength}
          </small>
          <br />
          <label htmlFor="precio">precio:</label>
          <br />
          <input
            type="number"
            className="input-edit"
            placeholder="precio"
            name="precio"
            value={newProduct.precio}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="descuento">Descuento:</label>
          <br />
          <input
            type="number"
            className="input-edit"
            placeholder="Descuento"
            name="descuento"
            value={newProduct.descuento}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="quantity">Cantidad de Viajes:</label>
          <br />
          <input
            type="number"
            className="input-edit"
            placeholder="Cantidad de Viajes"
            name="quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="localidad">Localidad:</label>
          <br />
          <input
            type="text"
            className="input-edit"
            placeholder="Localidad"
            name="localidad"
            value={newProduct.localidad}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <br />
          <label htmlFor="imagen">Imagen:</label>
          <br />
          <input
            className="input-edit"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </form>
        <button onClick={enviarDatosAlBackend}>Confirmar carga</button>
      </div>
    </div>
  );
};

export default SubirCompra;
