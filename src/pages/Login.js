import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Importa el contexto de usuario
import './stylesPages/Comprar.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const { setUserInfo } = useContext(UserContext);




  const handleLogin = () => {
    const url = 'http://localhost:4000/login'; // Reemplaza con la URL de tu servidor
    const data = {
      username: username,
      password: password,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Hubo un problema al realizar la solicitud.');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUserInfo(data); // Guarda la información del usuario en el contexto
        Swal.fire({
          icon: 'success',
          title: '¡Ingreso exitoso!',
          text: 'Has iniciado sesión con éxito.',
        }).then(() => {
          navigate('/');
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Hubo un error al intentar iniciar sesión.',
        });
      });
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
          type={showPassword ? 'text' : 'password'}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={showPassword ? faLockOpen : faLock}
          className="icon"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      <button onClick={handleLogin}>Iniciar sesión</button>
      <div className="register-link">
        ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
      </div>
    </div>
  );
};

export default LoginForm;
