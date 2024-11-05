// LoginModal.js
import React from "react";
import "./LoginModal.css";

const LoginModal = ({ onClose }) => {
  return (
    <div className="login-overlay">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form>
          <label htmlFor="username">Usuario</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" required />

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