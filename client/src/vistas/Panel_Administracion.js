import React, { useState, useEffect } from "react";
import "./Panel_Administracion.css";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";

const PanelAdministracion = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [accessDeniedMessage, setAccessDeniedMessage] = useState("");
  const [items, setItems] = useState([
    { id: 1, name: "Pizza", cantidad: 100 },
    { id: 2, name: "Hamburguesa", cantidad: 200 },
    { id: 3, name: "Ensalada", cantidad: 300 },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ id: "", name: "", cantidad: "" });
  const [editItem, setEditItem] = useState(null);  // Estado para editar un producto

  useEffect(() => {
    const currentUserRole = localStorage.getItem("currentUser");
    setRole(currentUserRole);
  }, []);

  const handleSectionClick = (section, requiredRole) => {
    if (requiredRole.includes(role)) {
      setActiveSection(section);
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

  const handleAddItemClick = () => {
    setShowAddForm(true);
    setEditItem(null); // Aseguramos que no se esté editando ningún artículo cuando se agrega uno nuevo
  };

  const handleEditItemClick = (item) => {
    setEditItem(item); // Establecemos el producto a editar
    setShowAddForm(true); // Mostramos el formulario de agregar (pero con datos de edición)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editItem) {
      setEditItem((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    if (newItem.id && newItem.name && newItem.cantidad) {
      setItems((prevItems) => [
        ...prevItems,
        { id: newItem.id, name: newItem.name, cantidad: parseInt(newItem.cantidad) },
      ]);
      setNewItem({ id: "", name: "", cantidad: "" });
      setShowAddForm(false);
    }
  };

  const handleEditItemSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editItem.id ? { ...item, name: editItem.name, cantidad: parseInt(editItem.cantidad) } : item
        )
      );
      setEditItem(null); // Limpiar el estado de edición después de actualizar
      setShowAddForm(false);
    }
  };

  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <div className="sidebar-menu">
        <h2 className="inventory-title">Manejo de Inventario</h2>
        <div className="button-container">
          <button
            className="inventory-button"
            onClick={() => handleSectionClick("inventario", ["admin", "mesero", "cocinero"])}
          >
            Inventario
          </button>
          <button
            className="inventory-button"
            onClick={() => handleSectionClick("cocina", ["admin", "cocinero"])}
          >
            Cocina
          </button>
          <button
            className="inventory-button"
            onClick={() => handleSectionClick("administracion", ["admin"])}
          >
            Administración
          </button>
          <button
            className="inventory-button"
            onClick={() => handleSectionClick("ordenes", ["admin", "mesero"])}
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
        {activeSection === "inventario" && (
          <div className="inventory-container">
            <h2>Inventario de Artículos de Comida</h2>
            <div className="item-list">
              {items.map((item) => (
                <div className="item" key={item.id}>
                  <span>{item.name}</span>
                  <span>{item.cantidad}</span>
                  <div className="item-buttons">
                    <button className="inventory-button" onClick={() => handleEditItemClick(item)}>
                      Editar
                    </button>
                    <button className="inventory-button" onClick={() => handleDeleteItem(item.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="inventory-button" onClick={handleAddItemClick}>
              Agregar
            </button>

            {showAddForm && (
              <form onSubmit={editItem ? handleEditItemSubmit : handleAddItemSubmit} className="add-item-form">
                <h3>{editItem ? "Editar Artículo" : "Agregar Nuevo Artículo"}</h3>
                <div className="form-group">
                  <label htmlFor="id">ID</label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={editItem ? editItem.id : newItem.id}
                    onChange={handleInputChange}
                    required
                    disabled={editItem} // No permitir cambiar el ID en la edición
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editItem ? editItem.name : newItem.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cantidad">Cantidad</label>
                  <input
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    value={editItem ? editItem.cantidad : newItem.cantidad}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="inventory-button">
                  {editItem ? "Guardar Cambios" : "Agregar"}
                </button>
              </form>
            )}
            <button className="back-button" onClick={() => setActiveSection(null)}>
              Regresar al Panel de Inventario
            </button>
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