// LoginModal.js
import React, { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = (event) => {
    if (username === "admin1" && password === "admin1234") {
      localStorage.setItem("currentUser", "admin");

      alert("Inicio de  exitoso como Admin");
    } else if (username === "waiter1" && password === "waiter1234") {
      localStorage.setItem("currentUser", "mesero");

      alert("Inicio de sesión exitoso como Mesero");
    } else if (username === "cook1" && password === "cook1234") {
      localStorage.setItem("currentUser", "cocinero");

      alert("Inicio de sesión exitoso como Cocinero");
    } else {
      alert("Credenciales incorrectas");
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
            onChange={handleUsernameChange}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        <div className="login-actions">
          <button onClick={onClose} className="back-button">Regresar</button>
          <button className="register-button">Registrar</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;