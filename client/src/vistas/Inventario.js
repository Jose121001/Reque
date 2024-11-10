// Inventario.js

import React from "react";
import "./Inventario.css";

const Inventory = ({BackToManageInventory}) => {

  // Simulamos algunos artículos de comida
  const items = [
    { id: 1, name: "Pizza", cantidad: 100 },
    { id: 2, name: "Hamburguesa", cantidad: 200 },
    { id: 3, name: "Ensalada", cantidad: 300 },
  ];

  return (
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
  );
};

export default Inventory;