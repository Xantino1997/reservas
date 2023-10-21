import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./stylesPages/Confirma-Compra.css";
import "./stylesPages/Comprar.css";
import Swal from "sweetalert2";
import mercadoPago from "../assets/mercadoPago.png";
import { useNavigate } from "react-router-dom";
import Factura from "./FacturaComponent";

const ConfirmaCompra = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(` https://backend-reservas.vercel.app/products/${id}`)
    // fetch(` https://backend-reservas.vercel.app/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product data", error));
  }, [id]);

  const handleInputChange = (e) => {
    setCantidad(e.target.value);
  };

  const handleSubtract = () => {
    setCantidad((prev) => Math.max(prev - 1, 1));
  };

  const handleAdd = () => {
    setCantidad((prev) => Math.min(prev + 1, product?.quantity || 1));
  };

  function generarNumeroFactura() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return result;
  }

  const handleCompraConfirmada = () => {
    if (product && product.quantity <= 0) {
      Swal.fire({
        title: "Lo sentimos",
        text: "Los productos están agotados. No se pueden realizar más compras.",
        icon: "error",
      });
      return;
    }
    const nombreCompleto = document.querySelector('input[type="text"]').value;
    const correoElectronico = document.querySelector('input[type="email"]').value;
    const metodoPago = document.querySelector("select").value;

    const payload = {
      nombre: nombreCompleto,
      correo: correoElectronico,
      metodoPago: metodoPago,
      productId: product._id,
      cantidad: cantidad,
    };

    const detallesProducto = {
      title: product.title,
      precio: product.precio,
      descuento: product.descuento,
      localidad: product.localidad,
      imagen: product.imagen,
    };

    payload.productDetails = detallesProducto;

    const numeroFactura = generarNumeroFactura();
    payload.numeroFactura = numeroFactura;
  
    // fetch(" https://backend-reservas.vercel.app/procesar-pago", {
    fetch(" https://backend-reservas.vercel.app/procesar-pago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const mensaje = `
          Detalles del producto:
          Título: ${detallesProducto.title}
          Precio: ${detallesProducto.precio}
          Descuento: ${detallesProducto.descuento}
          Localidad: ${detallesProducto.localidad}
        `;
        Swal.fire({
          title: "¡Compra confirmada!",
          text:
            "Te hemos enviado un correo con los detalles de tu compra y el número de transacción.",
          icon: "success",
          html: mensaje,
        });
          // Redirect despues de 5s
          setTimeout(() => {
            navigate('/')
        }, 5000);
      })
      .catch((error) => {
        console.error("Hubo un problema al procesar la compra:", error);
        Swal.fire("¡Error!", "Hubo un problema al procesar la compra.", "error");
      });
  };

  const descuentoAplicable =
    product && product.descuento > 0
      ? `Aprovecha: ${product.descuento}% de descuento`
      : "No hay descuentos por el momento";

  const handleNavigateToComprar = () => {
    navigate("/comprar");
  };

  if (!product) {
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <i className="fas fa-spinner fa-spin"></i>
          <div>Cargando...</div>
        </div>
      </div>
    );
  }


  return (
    <div className="confirma-compra-container">
      <div className="product-details-compra">
        <h2>{product.localidad}</h2>
        <div className="product-quantity-confirmar">
          {product.quantity <= 0 ? (
            <small
              className="quantity-text-low-confirmar"
              style={{ color: "red" }}
            >
              Agotados
            </small>
          ) : product.quantity <= 3 ? (
            <small className="quantity-text-low-confirmar">
              Disponibles: {product.quantity}
            </small>
          ) : (
            <small className="quantity-text-high-confirmar">
              Disponibles: {product.quantity}
            </small>
          )}
        </div>
        <img src={product.imagen} alt={product.title} />
        <h2>{product.title}</h2>
        <h5 style={{ color: "red", fontSize: "18px" }}>
          <del>${product.precio}</del>
        </h5>
        <hr />
        <h5
          style={{ background: "lightgreen", color: "green", fontSize: "18px" }}
        >
          <ins>
            ${product.precio - (product.precio * product.descuento) / 100}
          </ins>
        </h5>
        <h6 style={{ color: "green", fontSize: "18px" }}>
          {descuentoAplicable}
        </h6>
      </div>
      <div className="payment-form">
        <form action="/procesar-pago" method="POST">
          <input type="text" placeholder="Nombre completo" required />
          <input type="email" placeholder="Correo electrónico" required />
          <select required>
            <option value="">Selecciona un método de pago</option>
            <option value="visa">Visa</option>
            <option value="mastercard">MasterCard</option>
            <option value="amex">American Express</option>
          </select>
          <div className="container-agregar">
            <button
              className="boton-agregar"
              type="button"
              onClick={handleSubtract}
            >
              -
            </button>
            <input
              className="input-agregar"
              type="number"
              placeholder={`Cantidad (máx: ${product.quantity})`}
              value={cantidad}
              onChange={handleInputChange}
              min="1"
              max={product.quantity}
            />
            <button className="boton-agregar" type="button" onClick={handleAdd}>
              +
            </button>
          </div>
          <button type="button" onClick={handleCompraConfirmada}>
            Confirmar Compra
          </button>
        </form>
        <img src={mercadoPago} alt="Mercado Pago" />
        <button onClick={handleNavigateToComprar}>Regresar</button>
      </div>
    
    </div>
  );
};

export default ConfirmaCompra;
