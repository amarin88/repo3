import fs from "fs"; // Módulo de Filesystem

let products = [];
let pathFile = "./products.json"; //Ruta del archivo JSON donde se almacenarán los productos

//CRUD completo con Fylesystem

const addProduct = async (
  title,
  description,
  price,
  thumbnail,
  code,
  stock
) => {
  const newProduct = {
    id: products.length + 1,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  };

  if (Object.values(newProduct).includes(undefined)) {
    console.log("All entries are required");
    return;
  }

  const codeAlreadyExists = products.find(
    (product) => product.code === code
  );
  if (codeAlreadyExists) {
    console.log(`${code} already exists.`);
    return;
  }

  products.push(newProduct);

  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};
// La función addProduct ahora es asíncrona y almacena los productos en formato JSON en la ruta asignada para nuestro archivo.

const getProducts = async () => {
  const productsJson = await fs.promises.readFile(pathFile, "utf-8");

  products = JSON.parse(productsJson) || [];

  return products;
};
//La función getProducts ahora es asíncrona, obtiene la información del archivo json desde la ruta asignada y convierte los productos en objetos.

const getProductById = async (id) => {
  await getProducts();
  const product = products.find((product) => product.id === parseInt(id));
  if (!product) {
    console.log(`Product with id: ${id} is not found`);
    return;
  }

  console.log(product);
  return product;
};
//La función getProductsById ahora es asíncrona, obtiene la información del archivo json desde la ruta asignada y devuelve el objeto con el producto según el id  que consultemos a través de un callback.

const updateProduct = async (id, dataProduct) => {
  await getProducts();
  const index = products.findIndex((product) => product.id === id);
  products[index] = {
    ...products[index],
    ...dataProduct,
  };
  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};
//La función updateProduct que es asíncrona, que primero obtiene la información del archivo json desde la ruta asignada y luego obtiene un objeto con un producto según el id que consultemos a través de un callback a través del método indexOf() para luego a través del operador spread que recoge todas las propiedades del producto sobreescribirlas con los valores que asignemos

const deleteProduct = async (id) => {
  await getProducts();
  products = products.filter((product) => product.id !== id);
  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

//deleteProduct: Función asincrona que primero obtiene la información del archivo json desde la ruta asignada y luego filtra los productos y devuelve todos excepto el asignado a través del id por medio de un callback

// Área de testing

// addProduct();

// addProduct("Coca-Cola", "refresco carbonatado", 1.50, "coca_cola.jpg", "001", 100);
// addProduct("Pepsi", "refresco de cola", 1.25, "pepsi.jpg", "002", 80);
// addProduct("Sprite", "refresco de lima limón", 1.00, "sprite.jpg", "003", 120);

// getProducts();

// getProductById(1);
// getProductById(4);

//updateProduct();

// updateProduct(2,
// {
//   title: "Fanta",
//   description: "refresco de naranja",
//   price: 1.00,
//   thumbnail: "fanta.jpg",
//   code: "002",
//   stock: 100,
// });

//deleteProduct();

//deleteProduct(1);
//deleteProduct(2);

export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
