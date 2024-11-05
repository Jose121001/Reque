import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login'; // Importar el ícono de Login
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Importar el ícono de carrito
import LocalBarIcon from '@mui/icons-material/LocalBar'; // Importar el ícono de bebidas
import FastfoodIcon from '@mui/icons-material/Fastfood'; // Importar el ícono de comida
import RestaurantIcon from '@mui/icons-material/Restaurant'; // Importar el ícono de cubiertos
import "./App.css"; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <div className="App">
        <header>
          <div className="menu_side_div">
            <nav className="Menu_sidebar">
              <h1 className="Titulo">The Grill Steak</h1>
              <button className="boton_clientes">
                <LoginIcon style={{ marginRight: '8px' }} /> {/* Espacio entre el ícono y el texto */}
              </button>
              <button className="boton_Proveedores">
                <ShoppingCartIcon style={{ marginRight: '8px' }} /> {/* Espacio entre el ícono y el texto */}
              </button>
            </nav>
          </div>
        </header>
        
        {/* Panel con desplazamiento horizontal */}
        <div className="panel_scroll">
          <div className="contenido_panel">
            {/* Contenido del panel, puede ser cualquier cosa */}
            <button className="boton_Category">
              <RestaurantIcon style={{ marginRight: '8px' }} /> {/* Espacio entre el ícono y el texto */}
            </button>

            <button className="boton_Category2">
              <LocalBarIcon style={{ marginRight: '8px' }} /> {/* Espacio entre el ícono y el texto */}
            </button>
 

              <button className="boton_Category3">
              <FastfoodIcon style={{ marginRight: '8px' }} /> {/* Espacio entre el ícono y el texto */}
              </button>


              <button className="boton_Category4"> 
                <LoginIcon style={{ marginRight: '8px' }} /> {/* Espacio entre el ícono y el texto */}
              </button>


              
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
