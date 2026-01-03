const { db } = require("../../../database/db");

async function restockProduct(productId, amount) {
  await db.read();

  const product = db.data.products.find((p) => p.id === productId);

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  product.stock += amount;

  await db.write();
  return product;
}

module.exports = { restockProduct };
