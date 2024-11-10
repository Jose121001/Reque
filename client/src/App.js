// App.js
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import CakeIcon from "@mui/icons-material/Cake";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

import LoginModal from "./vistas/LoginModal";
import InventoryManagement from "./vistas/Panel_Administracion";
import Inventory from "./vistas/Inventario";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showInventoryManagement, setShowInventoryManagement] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowInventoryManagement(true); // Muestra el panel de inventario tras login exitoso
  };

  const handleBackToMenu = () => {
    setShowInventoryManagement(false); // Vuelve al menú principal
  };

  const handleGoToInventory = () => {
    setShowInventoryManagement(false);
    setShowInventory(true); 
  };

  const handleBackToManageInventory = () => {
    setShowInventory(false); 
    setShowInventoryManagement(true);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <div className="App">
        {showInventoryManagement ? (
          // Muestra el panel de inventario si se inició sesión correctamente
          <InventoryManagement onBack={handleBackToMenu} handleGoToInventory={handleGoToInventory} />
        ) : (
          <>
            <header>
              <div className="menu_side_div">
                <nav className="Menu_sidebar">
                  <h1 className="Titulo">
                    <OutdoorGrillIcon style={{ marginRight: "8px", fontSize: "1.5em", verticalAlign: "middle" }} />
                    The Grill Steak
                  </h1>
                  <button className="boton_clientes" onClick={handleLoginClick}>
                    <LoginIcon style={{ marginRight: "8px" }} />
                    Clientes
                  </button>
                  <button className="boton_Proveedores">
                    <ShoppingCartIcon style={{ marginRight: "8px" }} />
                    Proveedores
                  </button>
                </nav>
              </div>
            </header>
            
            <div className="panel_scroll">
              <div className="contenido_panel">
                <button className="boton_Category">
                  <LocalDiningIcon style={{ marginRight: "8px" }} />
                  Entradas
                </button>
                <button className="boton_Category">
                  <FastfoodIcon style={{ marginRight: "8px" }} />
                  Carnes
                </button>
                <button className="boton_Category">
                  <LocalPizzaIcon style={{ marginRight: "8px" }} />
                  Pizzas
                </button>
                <button className="boton_Category">
                  <LocalBarIcon style={{ marginRight: "8px" }} />
                  Bebidas
                </button>
                <button className="boton_Category">
                  <CakeIcon style={{ marginRight: "8px" }} />
                  Postres
                </button>
              </div>
            </div>
            {showLogin && <LoginModal onClose={handleCloseLogin} onLoginSuccess={handleLoginSuccess} />}
            {showInventory && <Inventory BackToManageInventory={handleBackToManageInventory} />}
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;