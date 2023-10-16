import React, { useState, useEffect } from "react";
import "./stylesPages/Factura.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LogoViaje from "../assets/logoTravel.png";

// import ConfirmaCompra from "./ConfirmaCompra";

const FacturaComponent = ({ detallesProducto }) => {
  const [numeroComprobante, setNumeroComprobante] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    setNumeroComprobante(generarNumeroFactura());
    setFecha(generarFechaHora());
  }, []);

  function generarNumeroFactura() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    return result;
  }

  function generarFechaHora() {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const fecha = date.toLocaleDateString("es-ES", options);
    const hora = date.toLocaleTimeString("es-ES");
    setHora(hora);
    return fecha;
  }

  function descargarPDF() {
    const doc = new jsPDF();

    const detallesProducto = {
      title: detallesProducto.tile,
      precio:  detallesProducto.tile,
      descuento:  detallesProducto.tile,
      localidad: "Ejemplo de localidad",
      imagen: "ruta/a/la/imagen/producto.png", // Reemplaza con la ruta de la imagen de tu producto
    };

    const columns = ["Title", "Precio", "Descuento", "Localidad"];
    const data = [
      [
        detallesProducto.title,
        detallesProducto.precio,
        detallesProducto.descuento,
        detallesProducto.localidad,
      ],
    ];

    // Agregar título
    doc.setFontSize(18);
    doc.setTextColor(255, 0, 0); // Establecer color de texto en rojo
    doc.text("Compraste", 105, 30, null, null, "center"); // Alineado al centro

    // Agregar tabla
    doc.autoTable({
      startY: 40,
      head: [columns],
      body: data,
    });

    // Agregar imagen
    // const imgData = detallesProducto.imagen;
    const width = 50; // Ancho de la imagen
    const height = 50; // Altura de la imagen
    // doc.addImage(imgData, "PNG", 80, 100, width, height);

    // Guardar el archivo PDF
    doc.save("factura.pdf");
  }

  function compartirWhatsApp() {
    // Lógica para compartir en WhatsApp
    // Por ejemplo, puedes abrir una ventana de compartir con la imagen de la factura en miniatura.
    // Asegúrate de tener la imagen de la factura disponible en una ruta accesible.
    // Aquí hay un ejemplo de cómo puedes abrir una ventana de compartir con la imagen de la factura en miniatura.
    const imgSrc = "ruta/a/la/imagen.png"; // Reemplaza esto con la ruta de tu imagen de la factura
    const textToShare = `Número de Comprobante: ${numeroComprobante}, Fecha: ${fecha}, Hora de compra: ${hora}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Factura",
          text: textToShare,
          url: imgSrc,
        })
        .then(() => console.log("Compartido con éxito"))
        .catch((error) => console.log("Error al compartir", error));
    } else {
      console.log("La API de compartir no es compatible en este navegador.");
    }
  }

  return (
    <>
      <div className="factura-container">
        <div className="factura">
          <div className="factura-header">
            <img  className="perfil-img " src={LogoViaje} alt="Logo de la empresa" />
            <p>Número de Comprobante: {numeroComprobante}</p>
            <p>Fecha: {fecha}</p>
            <p>Hora de compra: {hora}</p>
            <img className="perfil-img " src={LogoViaje} alt="Captura del comprobante" />
          </div>
          <div className="factura-detalle">
          </div>
          <div className="agradecimiento">
            <p>Gracias por tu compra</p>
          </div>
          <div className="botones">
            <button className="descargar-btn" onClick={descargarPDF}>
              Descargar
            </button>
            <button className="compartir-btn" onClick={compartirWhatsApp}>
              Compartir
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacturaComponent;
