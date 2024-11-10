import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import axios from "axios";

const CarritoModal = ({ open, onClose }) => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (open) {
      // Obtener los productos desde el backend
      axios.get("http://localhost:3001/get-carrito")
        .then(response => {
          setProductos(response.data);
          calcularTotal(response.data);
        })
        .catch(err => {
          console.error("Error al obtener los productos:", err);
        });
    }
  }, [open]);

  const calcularTotal = (productos) => {
    const total = productos.reduce((sum, product) => sum + product.total, 0);
    setTotal(total);
  };

  const eliminarProducto = (productName) => {
    axios.post("http://localhost:3001/eliminar-producto", { productName })
      .then(() => {
        // Actualizar el carrito después de eliminar el producto
        setProductos(prevProductos => prevProductos.filter(product => product.name !== productName));
        calcularTotal(productos.filter(product => product.name !== productName));
      })
      .catch(err => {
        console.error("Error al eliminar el producto:", err);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          width: "300px",
          boxShadow: 24,
        }}
      >
        <Typography variant="h6">Carrito de Compras</Typography>
        {productos.length === 0 ? (
          <Typography>No hay productos en el carrito</Typography>
        ) : (
          <>
            <div>
              <Typography variant="body1">Productos:</Typography>
              {productos.map((producto) => (
                <div key={producto.name}>
                  <Typography>{producto.name}</Typography>
                  <Typography>Cantidad: {producto.quantity}</Typography>
                  <Typography>Precio: ${producto.unitPrice}</Typography>
                  <Typography>Total: ${producto.total}</Typography>
                  <Button variant="contained" color="error" onClick={() => eliminarProducto(producto.name)}>
                    Eliminar
                  </Button>
                  <hr />
                </div>
              ))}
              <Typography variant="h6">Total: ${total}</Typography>
            </div>
          </>
        )}
        <Button onClick={onClose}>Cerrar</Button>
      </Box>
    </Modal>
  );
};

export default CarritoModal;
