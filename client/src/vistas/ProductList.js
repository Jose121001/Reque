import React, { useState } from "react";
import { Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

function ProductList({ category }) {
  const products = {
    entradas: ["Ensalada Cesar", "Sopa de Tomate", "Aros de Cebolla", "Tortillas", "Palitos de queso", "Papas fritas"],
    carnes: ["Filete de Res", "Pechuga de Pollo", "Costillas"],
    pizzas: ["Pizza Margherita", "Pizza Pepperoni", "Pizza Vegetariana"],
    bebidas: ["Coca Cola", "Agua Mineral", "Cerveza"],
    postres: ["Tarta de Manzana", "Helado", "Brownie"],
  };

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const unitPrice = 10;  // Precio unitario del producto

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuantity(1);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, Number(e.target.value)));  // Asegurarse de que la cantidad sea al menos 1
  };

  // Función para enviar los datos del producto al servidor Express
  const saveProductToServer = async () => {
    if (!selectedProduct || quantity < 1) {
      console.error("Producto o cantidad no válida");
      return;  // No agregar si no es válido
    }

    const newProduct = {
      name: selectedProduct,
      quantity,
      unitPrice,
      total: quantity * unitPrice,
    };

    // Enviar los datos al servidor Express
    try {
      const response = await fetch('http://localhost:3001/guardar-producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Producto guardado con éxito:', data);
        handleClose();  // Cerrar el modal
      } else {
        console.error('Error al guardar el producto:', data.message);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginTop: "30px" }}>
      <h2 style={{ textAlign: "center", width: "100%" }}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
      <ul style={{ display: "flex", flexWrap: "nowrap", listStyle: "none", padding: "0", margin: "0", overflowX: "auto" }}>
        {products[category]?.map((product, index) => (
          <li key={index} style={{ marginTop: "20px", marginRight: "40px", cursor: "pointer" }}>
            <Button 
              variant="contained" 
              onClick={() => handleOpen(product)}
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

      {/* Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: "#A68A64", color: "#FFFFFF" }}>
          {selectedProduct}
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#A68A64", color: "#FFFFFF" }}>
          <TextField
            label="Cantidad"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            fullWidth
            margin="dense"
            InputProps={{ style: { color: "#FFFFFF" }, inputProps: { min: 1 } }}
            InputLabelProps={{ style: { color: "#FFFFFF" } }}
          />
          <Typography variant="h6" style={{ marginTop: "15px", color: "#FFFFFF" }}>
            Precio Unitario: ${unitPrice}
          </Typography>
          <Typography variant="h6" style={{ marginTop: "15px", color: "#FFFFFF" }}>
            Total: ${(quantity * unitPrice).toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#A68A64" }}>
          <Button onClick={handleClose} color="primary" style={{ color: "#FFFFFF" }}>
            Regresar
          </Button>
          <Button
            onClick={saveProductToServer}  // Llama a la función para guardar en el servidor
            color="secondary"
            style={{ color: "#FFFFFF" }}
          >
            Carrito
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductList;
