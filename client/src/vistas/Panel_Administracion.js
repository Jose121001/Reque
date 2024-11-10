import React, { useState } from "react";
import "./Panel_Administracion.css";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";

const PanelAdministracion = ({ onBack, handleGoToInventory }) => {
  const [isAdminPanelVisible, setIsAdminPanelVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdminClick = () => {
    setIsAdminPanelVisible(true); // Muestra el panel de administración cuando se hace clic
  };

  const handleCreateUser = (event) => {
    event.preventDefault();

    if (!username || !password || !role) {
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }

    // Aquí podrías agregar la lógica para crear el usuario en la base de datos
    console.log(`Usuario creado: ${username} con el rol: ${role}`);

    // Limpiar formulario y mostrar mensaje de éxito
    setUsername("");
    setPassword("");
    setRole("");
    setErrorMessage("");
  };

  return (
    <div className="container">
      <div className="sidebar-menu">
        <h2 className="inventory-title">Manejo de Inventario</h2>
        <div className="button-container">
          <button className="inventory-button" onClick={handleGoToInventory}>
            Inventario
          </button>
          <button className="inventory-button">Cocina</button>
          <button className="inventory-button" onClick={handleAdminClick}>
            Administración
          </button>
          <button className="inventory-button">Ordenes</button>
        </div>
        <button className="back-button" onClick={onBack}>
          Regresar al Menú Principal
        </button>
        
        {/* Footer del menú lateral */}
        <footer className="sidebar-footer">
          <OutdoorGrillIcon style={{ marginRight: "8px" }} />
          <span>Grill Steak</span>
        </footer>
      </div>
      
      {/* Panel derecho (Contenido principal) */}
      <div className="main-content">
        {isAdminPanelVisible && (
          <div className="admin-panel">
            <h3>Gestión de Usuarios</h3>
            <form onSubmit={handleCreateUser} className="create-user-form">
              <div className="form-group">
                <label htmlFor="username">Nombre de Usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Ingresa un nombre de usuario"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Ingresa una contraseña"
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Rol</label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Seleccione un rol</option>
                  <option value="Admin">Administrador</option>
                  <option value="Mesero">Mesero</option>
                  <option value="Cocinero">Cocinero</option>
                </select>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit" className="create-user-button">Crear Usuario</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelAdministracion;
