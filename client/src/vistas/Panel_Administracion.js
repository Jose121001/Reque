import React, { useState, useEffect } from "react";
import "./Panel_Administracion.css";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";

const PanelAdministracion = ({ onBack }) => {
  const [isAdminPanelVisible, setIsAdminPanelVisible] = useState(false);
  const [handldeGoToInventory, sethandldeGoToInventory] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Estado para manejar el mensaje de acceso denegado
  const [accessDeniedMessage, setAccessDeniedMessage] = useState("");

  // Simulamos algunos artículos de comida
  const items = [
    { id: 1, name: "Pizza", cantidad: 100 },
    { id: 2, name: "Hamburguesa", cantidad: 200 },
    { id: 3, name: "Ensalada", cantidad: 300 },
  ];

  useEffect(() => {
    // Recuperamos el rol del usuario desde localStorage
    const currentUserRole = localStorage.getItem("currentUser");
    setRole(currentUserRole);
  }, []);

  const handleAdminClick = () => {
    if (role === "admin") {
      setIsAdminPanelVisible(true); // Muestra el panel de administración cuando se hace clic
    } else {
      setAccessDeniedMessage("No tienes permiso para acceder a esta sección.");
    }
  };

  const handleGoToCocina = () => {
    if (role === "admin" || role === "cocinero") {
      // Lógica para redirigir a la sección de Cocina
    } else {
      setAccessDeniedMessage("No tienes permiso para acceder a esta sección.");
    }
  };

  const handleGoToOrdenes = () => {
    if (role === "admin" || role === "mesero") {
      // Lógica para redirigir a la sección de Ordenes
    } else {
      setAccessDeniedMessage("No tienes permiso para acceder a esta sección.");
    }
  };

  const handleInventoryClick = () => {
    if (role === "admin" || role === "mesero" || role === "cocinero") {
      sethandldeGoToInventory(true);
    } else {
      setAccessDeniedMessage("No tienes permiso para acceder a esta sección.");
    }
  };

  const BackToManageInventory = () => {
    sethandldeGoToInventory(false);
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
          <button
            className="inventory-button"
            onClick={handleInventoryClick}
            disabled={role !== "admin" && role !== "mesero" && role !== "cocinero"}
          >
            Inventario
          </button>
          <button
            className="inventory-button"
            onClick={handleGoToCocina}
            disabled={role !== "admin" && role !== "mesero"}
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

        {handldeGoToInventory && (
          <div className="inventory-container">
          <h2>Inventario de Artículos de Comida</h2>
          <div className="item-list">
            {items.map((item) => (
              <div className="item" key={item.id}>
                <span>{item.name}</span>
                <div className="item-buttons">
                  <button className="inventory-button">Editar</button>
                  <button className="inventory-button">Eliminar</button>
                  <button className="inventory-button">Agregar</button>
                </div>
              </div>
            ))}
          </div>
    
          {/* Botón para regresar al panel de inventario */}
          <button className="back-button" onClick={BackToManageInventory}>
            Regresar al Panel de Inventario
          </button>
        </div>
        )}  

        {/* Mostrar mensaje de acceso denegado si es necesario */}
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