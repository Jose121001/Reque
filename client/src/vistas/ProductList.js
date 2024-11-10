import React, { useState } from "react";
import { Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

function ProductList({ category }) {
  const products = {
    entradas: ["Ensalada Cesar", "Sopa de Tomate", "Aros de Cebolla", "Tortillas", "Palitos de queso", "Papas fritas"],
    carnes: ["Filete de res", "Pechuga de pollo", "Costillas_bbq", "Tomahack", "T Bone Steak"],
    pizzas: ["Pizza de camarones", "Pizza suprema", "Pizza de piña", "Pizza 10quesos"],
    bebidas: ["coca cola", "jugo de sandia", "agua enbotellada", "margarita"],
    postres: ["brownie", "helado", "Pie de manzana"],
  };

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const unitPrice = 10; // Precio unitario del producto

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuantity(1);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, Number(e.target.value))); // Asegurarse de que la cantidad sea al menos 1
  };

  const saveProductToServer = async () => {
    if (!selectedProduct || quantity < 1) {
      console.error("Producto o cantidad no válida");
      return; // No agregar si no es válido
    }

    const newProduct = {
      name: selectedProduct,
      quantity,
      unitPrice,
      total: quantity * unitPrice,
    };

    try {
      const response = await fetch('http://localhost:3001/guardar-producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const text = await response.text(); // Obtener el texto antes de convertirlo en JSON
      console.log('Respuesta del servidor:', text);

      try {
        const data = JSON.parse(text);
        if (response.ok) {
          console.log('Producto guardado con éxito:', data);
          handleClose(); // Cerrar el modal
        } else {
          console.error('Error al guardar el producto:', data.message);
        }
      } catch (error) {
        console.error('Error al parsear la respuesta JSON:', error);
      }

    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginTop: "30px" }}>
      <h2 style={{ textAlign: "center", width: "100%", fontFamily: "Arial, sans-serif", fontSize: "24px", marginBottom: "20px" }}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
      <ul style={{ display: "flex", flexWrap: "wrap", listStyle: "none", padding: "0", margin: "0", overflowX: "auto", justifyContent: "center" }}>
        {products[category]?.map((product, index) => (
          <li key={index} style={{ marginTop: "20px", marginRight: "20px", marginBottom: "30px", cursor: "pointer" }}>
            <Button
              variant="contained"
              onClick={() => handleOpen(product)}
              style={{
                textTransform: "none",
                backgroundColor: '#A4AC86',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "200px",
                padding: "15px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            >
              <img
                src={`/imagenes/${category}/${product.replace(/\s/g, "_")}.jpg`}
                alt={product}
                style={{ width: "75px", height: "75px", marginBottom: "10px", borderRadius: "5px" }}
              />
              <Typography variant="body1" style={{ color: "#FFFFFF", fontSize: "16px" }}>
                {product}
              </Typography>
            </Button>
          </li>
        ))}
      </ul>
     
      {/* Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle style={{ backgroundColor: "#656D4A", color: "#FFFFFF", textAlign: "center", padding: "16px" }}>
    {selectedProduct}
  </DialogTitle>
  <DialogContent style={{ backgroundColor: "#656D4A", color: "#FFFFFF", padding: "24px" }}>
    <TextField
      label="Cantidad"
      type="number"
      value={quantity}
      onChange={handleQuantityChange}
      fullWidth
      margin="dense"
      InputProps={{
        style: { color: "#FFFFFF" },
        inputProps: { min: 1 }
      }}
      InputLabelProps={{ style: { color: "#FFFFFF" } }}
      sx={{ marginBottom: "16px" }}
    />
    <Typography variant="h6" style={{ color: "#FFFFFF", marginBottom: "10px" }}>
      Precio Unitario: ${unitPrice}
    </Typography>
    <Typography variant="h6" style={{ color: "#FFFFFF", marginBottom: "20px" }}>
      Total: ${(quantity * unitPrice).toFixed(2)}
    </Typography>
    <Typography variant="body2" style={{ color: "#FFFFFF", fontStyle: "italic" }}>
      * Asegúrate de revisar la cantidad antes de agregar al carrito.
    </Typography>
  </DialogContent>
  <DialogActions style={{ backgroundColor: "#656D4A", padding: "16px" }}>
    <Button onClick={handleClose} color="primary" style={{backgroundColor:"#936639", color: "#FFFFFF", textTransform: "none" }}>
      Regresar
    </Button>
    <Button
      onClick={saveProductToServer}
      color="secondary"
      style={{ backgroundColor:"#936639", color: "#FFFFFF", textTransform: "none", fontWeight: "bold" }}
    >
      Agregar al Carrito
    </Button>
  </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductList;
