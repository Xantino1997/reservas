import { useState } from 'react';

const Logout = () => {
  const [loggedIn, setLoggedIn] = useState(true); // O cualquier estado que represente si el usuario está logeado

  const handleLogout = () => {
    // Eliminar el token de sesión almacenado en el localStorage
    localStorage.removeItem('token'); // Ajusta la clave según cómo hayas almacenado el token

    // Actualizar el estado de autenticación en tu aplicación
    setLoggedIn(false);
    // Otras acciones de limpieza si es necesario

    // Redirigir a la página de inicio de sesión o a la página principal
    window.location.href = '/'; // Ajusta la URL según tu configuración
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
