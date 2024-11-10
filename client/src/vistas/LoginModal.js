// LoginModal.js
import React, { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "admin1" && password === "admin1234") {
      localStorage.setItem("currentUser", "admin");
      onLoginSuccess(); // Llama a onLoginSuccess para mostrar el panel de inventario
    } else if (username === "waiter1" && password === "waiter1234") {
      localStorage.setItem("currentUser", "mesero");
      onLoginSuccess();
    } else if (username === "cook1" && password === "cook1234") {
      localStorage.setItem("currentUser", "cocinero");
      onLoginSuccess();
    } else {
      setErrorMessage("Credenciales incorrectas, por favor intenta de nuevo.");
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Iniciar Sesión</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <div className="login-actions">
          <button onClick={onClose} className="back-button">Regresar</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;