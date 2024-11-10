const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(express.json()); // Para poder parsear el JSON en el cuerpo de las solicitudes
app.use(cors());

// Ruta para agregar un producto al carrito y escribirlo en el archivo
app.post("/guardar-producto", (req, res) => {
  const product = req.body;

  // Convertir el producto a JSON
  const productData = JSON.stringify(product, null, 2);
  console.log(productData + " Aqui"); // Imprimir en consola para verificar el producto

  const dirPath = path.join(__dirname, 'Data'); // La carpeta donde deseas guardar el archivo

  // Verificar si la carpeta 'data' existe, si no, crearla
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // Crear la carpeta de manera recursiva si no existe
  }

  // Escribir el producto en el archivo 'pedidos.txt'
  fs.appendFile(path.join(dirPath, 'pedidos.txt'), `${productData}\n`, (err) => {
    if (err) {
      console.error("Error al escribir en el archivo:", err);
      return res.status(500).send("Error al escribir en el archivo");
    }

    res.status(200).send("Producto agregado al archivo");
  });
});


// Ruta para eliminar un producto del carrito
app.post("/eliminar-producto", (req, res) => {
    const { productName } = req.body; // El nombre del producto a eliminar
    const filePath = path.join(__dirname, 'data', 'pedidos.txt'); // Ruta al archivo de pedidos
  
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo:", err);
        return res.status(500).send("Error al leer el archivo");
      }
  
      let products = data.trim().split("\n").map(line => JSON.parse(line));
      products = products.filter(product => product.name !== productName); // Filtrar el producto a eliminar
  
      // Reescribir el archivo sin el producto eliminado
      const updatedData = products.map(product => JSON.stringify(product, null, 2)).join("\n");
      fs.writeFile(filePath, updatedData, "utf8", (err) => {
        if (err) {
          console.error("Error al escribir en el archivo:", err);
          return res.status(500).send("Error al escribir en el archivo");
        }
  
        res.status(200).send("Producto eliminado correctamente");
      });
    });
  });
  

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
