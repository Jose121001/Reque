import React, { useEffect, useState } from "react";
import axios from "axios";

function TuComponente({ open }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (open) {
      // Obtener los productos desde el backend
      axios
        .get("http://localhost:3001/factura")
        .then((response) => {
          setProductos(response.data); // Almacena productos en el estado
        })
        .catch((err) => {
          console.error("Error al obtener los productos:", err);
        });
    }
  }, [open]);

  return (
    <div>
      {/* Renderiza los productos aquí */}
      {productos.map((producto, index) => (
        <div key={index}>
          <h3>{producto.name}</h3>
          <p>Cantidad: {producto.quantity}</p>
          <p>Precio unitario: {producto.unitPrice}</p>
          <p>Total: {producto.total}</p>
        </div>
      ))}
    </div>
  );
}

export default TuComponente;
