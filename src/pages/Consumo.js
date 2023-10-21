import "./stylesPages/Consumo.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";

const ConsumoProductos = () => {
  const [datosProductos, setDatosProductos] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openDetails = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };

  useEffect(() => {
    const fetchComprobantes = async () => {
      try {
        const response = await fetch("https://backend-reservas.vercel.app/comprobantes");
        if (!response.ok) {
          throw new Error("Error al obtener los comprobantes");
        }
        const data = await response.json();
        setDatosProductos(data);
      } catch (error) {
        console.error("Error al obtener los comprobantes:", error);
      }
    };
    fetchComprobantes();
  }, []);

  const downloadPDF = () => {
    const element = document.querySelector(".descargar");
    const opt = {
      margin: 1,
      filename: "Tu_viaje.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      onBeforeSave: (pdf) => {
        // Ocultar botones en el PDF
        pdf.internal.container.removeChild(pdf.internal.buttons);
      },
    };

    html2pdf().from(element).set(opt).save();
  };

  const takeScreenshot = () => {
    const element = document.querySelector(".descargar");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "Tu_viaje.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const obtenerFechaFormateada = () => {
    const fechaActual = new Date();
    const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormateada = fechaActual.toLocaleTimeString('en-US', opcionesHora);
  
    return `Fecha: ${fechaFormateada} hora: ${horaFormateada}`;
  };
  
  

  const renderProductRows = (data) => {
    const rows = [];
    for (let i = 0; i < data.length; i += 3) {
      rows.push(
        <div className="row" key={i}>
          {data.slice(i, i + 3).map((product) => (
            <div key={product._id} className="comprobantes">
              <div className="icon-container">
                <FontAwesomeIcon icon={faSuitcase} />
              </div>
              <div className="product-img-container">
                <img
                  className="product-info-img"
                  src={product.imagen}
                  alt="Product"
                />
              </div>
              <div className="product-info-text">
                <p>{product.title}</p>
                <p>{product.description}</p>
                <h4>
                  ID de Compra:
                  <h5 style={{ backgroundColor: "lightgrey" }}>
                    {product.numeroFactura}
                  </h5>
                </h4>
                <p>Total: {product.precio}</p>
                <button
                  className="product-btn-text"
                  onClick={() => openDetails(product)}
                >
                  Ampliar
                </button>
                <button className="product-btn-text">Cancelar</button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  if (datosProductos.length === 0) {
    return (
      <div className="no-comprobantes-container">
        <h1 style={{ color: "gray" }}>
          No tienes ningún comprobante en estos momentos
        </h1>
        <br />
        <FontAwesomeIcon icon={faFileInvoice} size="3x" />
      </div>
    );
  }

  return (
    <div className="comprobante-container">
      {renderProductRows(datosProductos)}
      {showDetails && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeDetails}>
              &times;
            </span>
            <div className="descargar">
              <div>
                <FontAwesomeIcon icon={faFileInvoice} size="3x" />{""}<small>Fecha:{selectedProduct.fecha}</small>
                <h3 for="title">Comprobante de Pago:</h3>
                <label for="title">Destino</label>
                <h2>{selectedProduct.title}</h2>

                <label for="description">Description</label>
                <p>{selectedProduct.description}</p>

                <label for="precio">Precio</label>
                <p>{selectedProduct.precio}</p>

                <label for="quantity">Cantidad</label>
                <p>{selectedProduct.quantity}</p>

                <label for="localidad">Localidad</label>
                <p>{selectedProduct.localidad}</p>
                <h4>
                  ID de Compra:
                  <h5 style={{ backgroundColor: "lightgrey" }}>
                    {selectedProduct.numeroFactura}
                  </h5>
                </h4>
              </div>
              <declaimer>
                En caso de tener algún problema, comuníquese con{" "}
                <a
                  href="https://www.argentina.gob.ar/servicio/iniciar-un-reclamo-ante-la-direccion-nacional-de-defensa-del-consumidor-y-arbitraje-del"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Defensa Consumidor
                </a>{" "}
                o al número 0800-452-1555.
              </declaimer>
            </div>
            <div>
              <button className="descargar-btn-pedido" onClick={downloadPDF}>
                Descargar PDF
              </button>
              <button className="descargar-btn-pedido" onClick={takeScreenshot}>
                Descargar Imagen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumoProductos;
