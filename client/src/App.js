import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import CakeIcon from "@mui/icons-material/Cake";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ProductList from "./vistas/ProductList";
import LoginModal from "./vistas/LoginModal";
import CarritoModal from "./vistas/CarritoModal";
import InventoryManagement from "./vistas/Panel_Administracion";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false); // Inicialmente false
  const [showInventoryManagement, setShowInventoryManagement] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCarrito, setShowCarrito] = useState(false);

  // Función para abrir el modal de login
  const handleLoginClick = () => {
    setShowLogin(true); // Muestra el modal
  };

  // Función para cerrar el modal de login
  const handleCloseLogin = () => {
    setShowLogin(false); // Cierra el modal
  };

  // Función cuando el login es exitoso
  const handleLoginSuccess = () => {
    setShowLogin(false); // Cierra el modal
    setShowInventoryManagement(true); // Muestra el panel de administración
  };

  const handleBackToMenu = () => {
    setShowInventoryManagement(false);
  };

  const handleGoToInventory = () => {
    setShowInventoryManagement(false);
    setShowInventory(true);
  };

  const handleBackToManageInventory = () => {
    setShowInventory(false);
    setShowInventoryManagement(true);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCarritoClick = () => {
    setShowCarrito(true); // Muestra el modal del carrito
  };

  const handleCloseCarrito = () => {
    setShowCarrito(false); // Cierra el modal del carrito
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <div className="App">
        {showInventoryManagement ? (
          <InventoryManagement
            onBack={handleBackToMenu}
            handleGoToInventory={handleGoToInventory}
          />
        ) : (
          <>
            <header>
              <div className="menu_side_div">
                <nav className="Menu_sidebar">
                  <h1 className="Titulo">
                    <OutdoorGrillIcon
                      style={{
                        marginRight: "8px",
                        fontSize: "1.5em",
                        verticalAlign: "middle",
                      }}
                    />
                    The Grill Steak
                  </h1>
                  <button className="boton_clientes" onClick={handleLoginClick}>
                    <LoginIcon style={{ marginRight: "8px" }} />
                    Clientes
                  </button>
                  <button
                    className="boton_Proveedores"
                    onClick={handleCarritoClick}
                  >
                    <ShoppingCartIcon style={{ marginRight: "8px" }} />
                    Carrito
                  </button>
                </nav>
              </div>
            </header>

            <div className="panel_scroll">
              <div className="contenido_panel">
                <button
                  className="boton_Category"
                  onClick={() => handleCategoryClick("entradas")}
                >
                  <LocalDiningIcon style={{ marginRight: "8px" }} />
                  Entradas
                </button>

                <button
                  className="boton_Category"
                  onClick={() => handleCategoryClick("carnes")}
                >
                  <FastfoodIcon style={{ marginRight: "8px" }} />
                  Carnes
                </button>

                <button
                  className="boton_Category"
                  onClick={() => handleCategoryClick("pizzas")}
                >
                  <LocalPizzaIcon style={{ marginRight: "8px" }} />
                  Pizzas
                </button>

                <button
                  className="boton_Category"
                  onClick={() => handleCategoryClick("bebidas")}
                >
                  <LocalBarIcon style={{ marginRight: "8px" }} />
                  Bebidas
                </button>

                <button
                  className="boton_Category"
                  onClick={() => handleCategoryClick("postres")}
                >
                  <CakeIcon style={{ marginRight: "8px" }} />
                  Postres
                </button>
              </div>
            </div>

            {selectedCategory && <ProductList category={selectedCategory} />}
          </>
        )}

        <CarritoModal open={showCarrito} onClose={handleCloseCarrito} />
        
        {/* El modal de login solo aparecerá si showLogin es true */}
        <LoginModal
          open={showLogin}
          onClose={handleCloseLogin}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
