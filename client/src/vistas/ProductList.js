import React from "react";
import { Button, Typography } from "@mui/material";

function ProductList({ category }) {
  const products = {
    entradas: ["Ensalada Cesar", "Sopa de Tomate", "Aros de Cebolla", 'Tortillas', 'Palitos de queso', 'Papas fritas'],
    carnes: ["Filete de Res", "Pechuga de Pollo", "Costillas"],
    pizzas: ["Pizza Margherita", "Pizza Pepperoni", "Pizza Vegetariana"],
    bebidas: ["Coca Cola", "Agua Mineral", "Cerveza"],
    postres: ["Tarta de Manzana", "Helado", "Brownie"],
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginTop: "30px"}}>
      <h2 style={{ textAlign: "center", width: "100%" }}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
      <ul style={{ display: "flex", flexWrap: "nowrap", listStyle: "none", padding: "0", margin: "0", overflowX: "auto" }}>
        {products[category]?.map((product, index) => (
          <li key={index} style={{ marginTop: "20px", marginRight: "40px", cursor: "pointer" }}>
            <Button 
              variant="contained" 
              style={{
                textTransform: "none", 
                backgroundColor: '#A4AC86',
                display: "flex", 
                justifyContent: "flex-start", 
                alignItems: "center",
                width: "250px",
                marginTop: "80px",
                padding: "10px"
              }}
            >
              <img 
                src={`/imagenes/${category}/${product.replace(/\s/g, "_")}.jpg`} 
                alt={product} 
                style={{ width: "75px", height: "75px", marginRight: "10px" }}
              />
              <Typography variant="body1">{product}</Typography>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
