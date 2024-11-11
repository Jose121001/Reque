const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(express.json()); // Para poder parsear el JSON en el cuerpo de las solicitudes
app.use(cors());
app.use(express.json());  // Necesario para procesar el cuerpo de la solicitud como JSON


// Ruta para agregar un producto al carrito y escribirlo en el archivo

app.post('/guardar-producto', (req, res) => {
  const { name, quantity, unitPrice, total } = req.body;

  if (!name || typeof name !== 'string' || quantity < 1 || unitPrice < 0) {
    return res.status(400).json({ message: 'Datos inválidos' });
  }

  const newProduct = { name, quantity, unitPrice, total };

  fs.readFile('productos.json', 'utf-8', (err, data) => {
    let products = [];
    if (!err) {
      try {
        products = JSON.parse(data); // Parsear el contenido existente
      } catch (error) {
        console.error('Error al parsear JSON:', error);
      }
    }

    products.push(newProduct);

    // Escribir en el primer archivo
    fs.writeFile('productos.json', JSON.stringify(products, null, 2), (err) => {
      if (err) {
        console.error('Error al escribir en el archivo productos.json:', err);
        return res.status(500).json({ message: 'Error al guardar el producto' });
      }

      // Escribir en el segundo archivo (backup)
      fs.writeFile('factura_Productos.json', JSON.stringify(products, null, 2), (err) => {
        if (err) {
          console.error('Error al escribir en el archivo productos_backup.json:', err);
          return res.status(500).json({ message: 'Error al guardar el producto en el backup' });
        }

        // Responder solo si ambos archivos se escribieron correctamente
        res.status(200).json({ message: 'Producto guardado correctamente en ambos archivos' });
      });
    });
  });
});


// Endpoint para leer los productos en JSON
app.get('/productos', (req, res) => {
    fs.readFile('productos.json', 'utf-8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo:', err);
        return res.status(500).json({ message: 'Error al leer los productos' });
      }
  
      try {
        let products = JSON.parse(data);
  
        // Eliminar duplicados si es necesario
        products = products.filter((product, index, self) =>
          index === self.findIndex(p => p.name === product.name)
        );
  
        res.status(200).json(products);  // Envía los productos en formato JSON
      } catch (parseError) {
        console.error("Error al parsear el archivo JSON:", parseError);
        res.status(500).json({ message: "Error al parsear el archivo JSON" });
      }
    });
  });





  
  app.get('/factura', (req, res) => {
    fs.readFile('factura_Productos.json', 'utf-8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo:', err);
        return res.status(500).json({ message: 'Error al leer los productos' });
      }
  
      try {
        const products = JSON.parse(data); // Parsear el contenido del archivo JSON
        res.status(200).json(products); // Envía los productos en formato JSON
      } catch (parseError) {
        console.error("Error al parsear el archivo JSON:", parseError);
        res.status(500).json({ message: "Error al parsear el archivo JSON" });
      }
    });
  });
  
// Endpoint para eliminar todos los productos
// Endpoint para vaciar el carrito (eliminar todos los productos)
app.post('/vaciar-carrito', (req, res) => {
  const filePath = path.join(__dirname, 'productos.json'); // Ruta al archivo de productos
  
  // Primero leer el archivo
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return res.status(500).json({ message: "Error al leer el archivo de productos" });
    }

    // Parsear el contenido JSON
    let productos = [];
    try {
      productos = JSON.parse(data);
    } catch (parseError) {
      console.error("Error al parsear el JSON:", parseError);
      return res.status(500).json({ message: "Error al parsear el archivo de productos" });
    }

    // Si se encuentra algo en el carrito, proceder a vaciarlo
    if (productos.length > 0) {
      // Aquí, por ejemplo, puedes realizar alguna acción extra como "borrar" algo en específico
      // Pero en este caso, simplemente vaciamos el arreglo

      // Escribimos el archivo nuevamente con un arreglo vacío
      fs.writeFile(filePath, '[]', 'utf8', (err) => {
        if (err) {
          console.error("Error al vaciar el carrito:", err);
          return res.status(500).json({ message: "Error al vaciar el carrito" });
        }

        // Responder con éxito
        res.status(200).json({ message: "Carrito vaciado correctamente" });
      });
    } else {
      res.status(400).json({ message: "El carrito ya está vacío" });
    }
  });
});


// Ruta para eliminar un producto del carrito
app.post("/eliminar-producto", (req, res) => {
    const { productName } = req.body; // El nombre del producto a eliminar
    const filePath = path.join(__dirname, 'productos.json'); // Ruta al archivo de pedidos
  
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo:", err);
        return res.status(500).send("Error al leer el archivo");
      }
  
      // Convertir el contenido del archivo a un array de objetos JSON
      let products;
      try {
        products = JSON.parse(data); // Parseamos el JSON completo
      } catch (parseError) {
        console.error("Error al parsear el archivo JSON:", parseError);
        return res.status(500).send("Error al parsear el archivo JSON");
      }
  
      // Filtrar el array para eliminar el producto deseado
      products = products.filter(product => product.name !== productName);
  
      // Escribir el array actualizado de vuelta en el archivo
      fs.writeFile(filePath, JSON.stringify(products, null, 2), "utf8", (err) => {
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

