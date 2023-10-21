import { React } from "react";
import { Link } from "react-router-dom";
import "./styles/Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-dark ">
        <div className="container-footer">
            <div className="contact-column">
              <div className="contact">
                <address className="address">
                  <h3>Contacto</h3>
                  <p>123 Calle Principal</p>
                  <p>Cancun, Mexico</p>
                  <p>Teléfono: +1 123-456-7890</p>
                  <p>Email: info@comunidadhotelera.com</p>
                </address>
                <div className="social-icons">
                  <h3 className="social-icons-titulo">Síguenos en las redes</h3>
                  <div className="social-links">
                    <a href="#" className="social-icon">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#" className="social-icon">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#" className="social-icon">
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  </div>
                </div>
                <div className="form-footer-container">
                  <form className="form-footer">
                    <h3>Envíanos un mensaje</h3>
                    <div className="form-group">
                      <label htmlFor="name">Nombre:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Correo Electrónico:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Mensaje:</label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        rows="4"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Enviar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </footer>
      <div className="copyright">
        <p>
          &copy; {currentYear} Comunidad Hotelera.{" "}
          <Link> Todos los derechos reservados.</Link>
        </p>
      </div>
    </>
  );
}

export default Footer;
