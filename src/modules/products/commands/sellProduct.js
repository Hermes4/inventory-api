const { db } = require("../../../database/db");

async function sellProduct(productId, amount) {
  await db.read();

  const product = db.data.products.find((p) => p.id === productId);

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  if (product.stock < amount) {
    throw new Error("INSUFFICIENT_STOCK");
  }

  product.stock -= amount;

  await db.write();
  return product;
}

module.exports = { sellProduct };
