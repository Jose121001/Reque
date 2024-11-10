import React from "react";
import "./Panel_Administracion.css";

const InventoryManagement = ({ onBack, handleGoToInventory }) => {

  return (
    <div className="inventory-container">
      <h2>Manejo de Inventario</h2>
      <div className="button-container">
        <button className="inventory-button" onClick={handleGoToInventory}>
          Inventario
        </button>
        <button className="inventory-button">Cocina</button>
        <button className="inventory-button">Administración</button>
        <button className="inventory-button">Ordenes</button>
      </div>
      {/* Botón para regresar al menú principal */}
      <button className="back-button" onClick={onBack}>Regresar al Menú Principal</button>
    </div>
  );
};

export default InventoryManagement;