//Imports
import express, { response } from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./productManager.js";

//Servidor express
const app = express();

//Config puerto
const PORT = 8080;
const ready = () =>
  console.log(
    `Server ready on http://localhost:${PORT}. Press Ctrl + C to stop.`
  );

//Inicializador
app.listen(PORT, ready);

//Funcionalidades del servidor
app.use(express.json()); //para manejar json
app.use(express.urlencoded({ extended: true })); //para leer queries y params

//Ruta y función endpoint index
const index_route = "/";
const index_function = (req, res) => {
  try {
    const message = "Welcome to my API";
    return res.json({ status: 200, response: message });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, response: error.message });
  }
};

//Ruta y función endpoint /products
const products_route = "/products";
const products_route_by_id = "/products/:pid";
//Logica para leer los productos y limitar por número de resultados
async function readProducts(req, res) {
  try {
    // Obtener todos los productos
    let allProducts = await getProducts();

    // Verificar si se proporciona un límite
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

    // Aplicar el límite si es necesario
    if (limit) {
      allProducts = allProducts.slice(0, limit);
    }

    // Devolver los productos según el límite
    return res.json({ status: 200, response: allProducts });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, response: error.message });
  }
}
//Lógica para leer los productos por parámetro id
async function readProductsById(req, res) {
  try {
    const { pid } = req.params;
    const one = await getProductById(pid);
    if (one) {
      return res.json({ status: 200, response: one });
    } else {
      const error = new Error(`Product with id: ${pid} is not found`);
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}

//Config solicitudes/peticiones
app.get(index_route, index_function);
app.get(products_route, readProducts);
app.get(products_route_by_id, readProductsById);
