const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());


// Ruta para agregar un producto al carrito y escribirlo en el archivo
app.post("/guardar-producto", (req, res) => {
  const product = req.body;

  // Convertir el producto a JSON
  const productData = JSON.stringify(product, null, 2);

  // Escribir los datos en el archivo pedidos.txt
  fs.appendFile(path.join(__dirname, "client/src/pedidos.txt"), `${productData}\n`, (err) => {
    if (err) {
      console.error("Error al escribir en el archivo:", err);
      return res.status(500).send("Error al escribir en el archivo");
    }

    res.status(200).send("Producto agregado al archivo");
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
