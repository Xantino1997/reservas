import React, { useState, useEffect } from "react";
import "./ComprarEdit.css";
import LogoViaje from "../assets/logoTravel.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
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

const ProductsEdit = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [viajesCantidad, setViajesCantidad] = useState(0); // Nueva cantidad de viajes
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://backend-reservas.vercel.app/products") // Ajusta la ruta según tu configuración
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  const openEdit = (product) => {
    setSelectedProduct(product);
    setEditMode(true);
  };

  const confirmEdit = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...selectedProduct,
        quantity: viajesCantidad, 
      }),
    };
  
    fetch(
      `https://backend-reservas.vercel.app/products/${selectedProduct._id}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al editar el producto");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Producto editado con éxito:", data);
        setEditMode(false);
        Swal.fire("¡Éxito!", "El producto se ha editado con éxito.", "success");
        navigate("/comprar");
      })
      .catch((error) => {
        console.error("Error en la solicitud PUT:", error);
        Swal.fire(
          "¡Error!",
          "Ha ocurrido un error al editar el producto.",
          "error"
        );
      });
  };
  
  const cancelEdit = () => {
    setEditMode(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedProduct({ ...selectedProduct, imagen: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="products-container">
      {products.map((product) => (
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
          <button className="comprar-btn" onClick={() => openEdit(product)}>
            Edit
          </button>
        </div>
      ))}
      {editMode && selectedProduct && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <label className="label-edit">Título:</label>
            <input
              className="input-edit"
              type="text"
              value={selectedProduct.title}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  title: e.target.value,
                })
              }
            />
            <label className="label-edit">Precio:</label>
            <input
              className="input-edit"
              type="text"
              value={selectedProduct.precio}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  precio: e.target.value,
                })
              }
            />
            <label className="label-edit">Descripción:</label>
            <input
              className="input-edit"
              type="text"
              value={selectedProduct.description}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="edit-modal-content">
            <label className="label-edit">Descuento:</label>
            <input
              className="input-edit"
              type="text"
              value={selectedProduct.descuento}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  descuento: e.target.value,
                })
              }
            />
            <label className="label-edit">Cantidad de Viajes:</label>{" "}
            <input
              className="input-edit"
              type="number"
              value={viajesCantidad}
              onChange={(e) => setViajesCantidad(e.target.value)}
            />
          </div>
          <div className="edit-modal-content">
            <label className="label-edit">Imagen:</label>

            <label htmlFor="file-upload" className="label-edit-image">
              <FontAwesomeIcon
                icon={faCloudUploadAlt}
                style={{ marginRight: "10px" }}
              />
              Subir Imagen
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            <br />
            {selectedProduct.imagen && (
              <img
                src={selectedProduct.imagen}
                alt={selectedProduct.title}
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <button className="confirm-btn" onClick={confirmEdit}>
              Confirmar
            </button>
            <button className="cancel-btn" onClick={cancelEdit}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsEdit;
