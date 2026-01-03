const { db } = require("../../../database/db");
const { v4: uuid } = require("uuid");
const { calculateFinalPrice } = require("../pricing/pricingCalculator");

async function createOrder({ customerId, products }) {
  await db.read();

  const customer = {
    id: customerId,
    location: "EU",
  };

  const items = [];

  for (const p of products) {
    const product = db.data.products.find((prod) => prod.id === p.productId);

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    if (product.stock < p.quantity) {
      throw new Error("INSUFFICIENT_STOCK");
    }

    items.push({
      productId: product.id,
      price: product.price,
      quantity: p.quantity,
      category: product.category || "electronics",
    });
  }

  const pricing = calculateFinalPrice({
    items,
    customer,
  });

  for (const p of products) {
    const product = db.data.products.find((prod) => prod.id === p.productId);
    product.stock -= p.quantity;
  }

  const order = {
    id: uuid(),
    customerId,
    items,
    totalPrice: pricing.finalPrice,
    discountApplied: pricing.bestDiscount,
    createdAt: new Date().toISOString(),
  };

  db.data.orders.push(order);
  await db.write();

  return order;
}

module.exports = { createOrder };
