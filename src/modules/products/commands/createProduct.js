const { db } = require("../../../database/db");
const { v4: uuid } = require("uuid");

async function createProduct(data) {
  await db.read();

  const newProduct = {
    id: uuid(),
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
  };

  db.data.products.push(newProduct);
  await db.write();

  return newProduct;
}

module.exports = { createProduct };
