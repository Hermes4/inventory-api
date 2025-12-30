const { db } = require("../../../database/db");

async function getProducts() {
  await db.read();
  return db.data.products;
}

module.exports = { getProducts };
