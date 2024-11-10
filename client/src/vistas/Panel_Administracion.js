import React from "react";
import "./Panel_Administracion.css";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";

const InventoryManagement = ({ onBack, handleGoToInventory }) => {
  return (
    <div className="sidebar-menu">
      <h2 className="inventory-title">Manejo de Inventario</h2>
      <div className="button-container">
        <button className="inventory-button" onClick={handleGoToInventory}>
          Inventario
        </button>
        <button className="inventory-button">Cocina</button>
        <button className="inventory-button">Administración</button>
        <button className="inventory-button">Ordenes</button>
      </div>
      <button className="back-button" onClick={onBack}>Regresar al Menú Principal</button>
      
      {/* Footer del menú lateral */}
      <footer className="sidebar-footer">
        <OutdoorGrillIcon style={{ marginRight: "8px" }} />
        <span>Grill Steak</span>
      </footer>
    </div>
  );
};

export default InventoryManagement;
