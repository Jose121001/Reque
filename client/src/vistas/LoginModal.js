// LoginModal.js
import React, { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ open, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!open) return null; // Si open es false, no se renderiza el modal

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "adminJuan" && password === "admin1234") {
      localStorage.setItem("currentUser", "admin");
      onLoginSuccess(); // Llama a onLoginSuccess para mostrar el panel de inventario
    } else if (username === "adminJose" && password === "admin1234") {
      localStorage.setItem("currentUser", "admin");
      onLoginSuccess();
    } else if (username === "adminRaul" && password === "admin1234") {
      localStorage.setItem("currentUser", "admin");
      onLoginSuccess();
    } else if (username === "meseroJosimar" && password === "mesero1234") {
      localStorage.setItem("currentUser", "mesero");
      onLoginSuccess();
    } else if (username === "meseroDaniel" && password === "mesero1234") {
      localStorage.setItem("currentUser", "mesero");
      onLoginSuccess();
    } else if (username === "cocineroDiego" && password === "cocinero1234") {
      localStorage.setItem("currentUser", "cocinero");
      onLoginSuccess();
    } else if (username === "cocineroEmilio" && password === "cocinero1234") {
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
