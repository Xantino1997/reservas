import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faUnlockAlt,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";

import "./stylesPages/Sumate.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Lógica de autenticación
    // Por ahora, simplemente muestra un mensaje
    setLoggedIn(true);
  };

  return (
    <div className="login-form">
      <h2>Iniciar sesión</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FontAwesomeIcon icon={faUser} className="icon" />
      </div>
      <div className="input-container">
        <input
          type={showPassword ? "text" : "password"} // Cambia el tipo de input a "text" cuando se muestra la contraseña
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={showPassword ? faLockOpen : faLock} // Cambia el icono del candado según si se muestra la contraseña
          className="icon"
          onClick={() => setShowPassword(!showPassword)} // Toggle para mostrar/ocultar la contraseña
        />
      </div>
      <button onClick={handleLogin}>Iniciar sesión</button>
      {loggedIn && <p>¡Has iniciado sesión con éxito!</p>}
      <div className="register-link">
        ¿No tienes una cuenta? <a href="#">Regístrate</a>
      </div>
    </div>
  );
};

export default LoginForm;
