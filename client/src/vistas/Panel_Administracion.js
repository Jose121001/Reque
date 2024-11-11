import React, { useState, useEffect } from "react";
import "./Panel_Administracion.css";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";

const PanelAdministracion = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState(""); // Estado para la sección activa
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [accessDeniedMessage, setAccessDeniedMessage] = useState("");

  useEffect(() => {
    const currentUserRole = localStorage.getItem("currentUser");
    setRole(currentUserRole);
  }, []);

  const handleAdminClick = () => {
    if (role === "admin") {
      setActiveSection("admin"); // Muestra la sección de administración
      setAccessDeniedMessage(""); // Limpia el mensaje de acceso denegado si está activo
    } else {
      setAccessDeniedMessage("No tienes permiso para acceder a esta sección.");
    }
  };

  const handleGoToCocina = () => {
    if (role === "admin" || role === "cocinero") {
      setActiveSection("cocina");
      setAccessDeniedMessage("");
    } else {
      setAccessDeniedMessage("No tienes permiso para acceder a esta sección.");
    }
  };

  const handleGoToOrdenes = () => {
    if (role === "admin" || role === "mesero") {
      setActiveSection("ordenes");
      setAccessDeniedMessage("");
    } else {
      setAccessDeniedMessage("No tienes permiso para acceder a esta sección.");
    }
  };

  const handleGoToInventory = () => {
    if (role === "admin" || role === "mesero" || role === "cocinero") {
      setActiveSection("inventario");
      setAccessDeniedMessage("");
    } else {
      setAccessDeniedMessage("No tienes permiso para acceder a esta sección.");
    }
  };

  const handleCreateUser = (event) => {
    event.preventDefault();
    if (!username || !password || !role) {
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }
    console.log(`Usuario creado: ${username} con el rol: ${role}`);
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
          <button
            className="inventory-button"
            onClick={handleGoToInventory}
            disabled={role !== "admin" && role !== "mesero" && role !== "cocinero"}
          >
            Inventario
          </button>
          <button
            className="inventory-button"
            onClick={handleGoToCocina}
            disabled={role !== "admin" && role !== "cocinero"}
          >
            Cocina
          </button>
          <button
            className="inventory-button"
            onClick={handleAdminClick}
            disabled={role !== "admin"}
          >
            Administración
          </button>
          <button
            className="inventory-button"
            onClick={handleGoToOrdenes}
            disabled={role !== "admin" && role !== "mesero"}
          >
            Ordenes
          </button>
        </div>
        <button className="back-button" onClick={onBack}>
          Regresar al Menú Principal
        </button>
        
        <footer className="sidebar-footer">
          <OutdoorGrillIcon style={{ marginRight: "8px" }} />
          <span>Grill Steak</span>
        </footer>
      </div>
      
      <div className="main-content">
        {activeSection === "admin" && (
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

        {activeSection === "cocina" && (
          <div className="cocina-panel">
            <h3>Sección de Cocina</h3>
            {/* Contenido de la sección Cocina */}
          </div>
        )}

        {activeSection === "ordenes" && (
          <div className="ordenes-panel">
            <h3>Sección de Ordenes</h3>
            {/* Contenido de la sección Ordenes */}
          </div>
        )}

        {activeSection === "inventario" && (
          <div className="inventory-panel">
            <h3>Sección de Inventario</h3>
            {/* Contenido de la sección Inventario */}
          </div>
        )}

        {accessDeniedMessage && (
          <div className="access-denied-message">
            <p>{accessDeniedMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelAdministracion;
