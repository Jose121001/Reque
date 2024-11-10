import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import axios from "axios";

const CarritoModal = ({ open, onClose }) => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (open) {
      // Obtener los productos desde el backend
      axios
        .get("http://localhost:3001/productos") // Asegúrate de que la URL sea la correcta
        .then((response) => {
          setProductos(response.data);
          calcularTotal(response.data);
        })
        .catch((err) => {
          console.error("Error al obtener los productos:", err);
        });
    }
  }, [open]);

  const calcularTotal = (productos) => {
    const total = productos.reduce((sum, product) => sum + product.total, 0);
    setTotal(total);
  };

  const eliminarProducto = (productName) => {
    axios
      .post("http://localhost:3001/eliminar-producto", { productName })
      .then(() => {
        // Eliminar el producto del estado
        setProductos((prevProductos) => {
          const updatedProductos = prevProductos.filter(
            (product) => product.name !== productName
          );
          calcularTotal(updatedProductos); // Recalcular el total después de eliminar el producto
          return updatedProductos;
        });
      })
      .catch((err) => {
        console.error("Error al eliminar el producto:", err);
      });
  };

  const vaciarCarrito = () => {
    axios
      .post("http://localhost:3001/vaciar-carrito") // Llamada al endpoint para vaciar el carrito
      .then(() => {
        setProductos([]); // Vaciar el carrito en el frontend
        setTotal(0); // Resetear el total

        onClose();
      })
      .catch((err) => {
        console.error("Error al vaciar el carrito:", err);
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
          backgroundColor: "#656D4A",
          padding: "20px",
          width: "600px",
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
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => eliminarProducto(producto.name)}
                    sx={{
                      marginTop: "10px",
                      marginBottom: "20px",
                      backgroundColor: "#936639",
                    }}
                  >
                    Eliminar
                  </Button>
                  <hr />
                </div>
              ))}
              <Typography variant="h6">Total: ${total}</Typography>
            </div>
          </>
        )}
      
        <Button
          sx={{ backgroundColor: "#936639", color: "#fff", marginLeft:"250px" }}
          onClick={vaciarCarrito} // Llamar a la función para vaciar el carrito
        >
          Pagar
        </Button>
      </Box>
    </Modal>
  );
};

export default CarritoModal;
