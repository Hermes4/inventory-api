const { createOrderSchema } = require("./validation");
const { createOrder } = require("./commands/createOrder");

async function createOrderHandler(req, res) {
  const { error, value } = createOrderSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const order = await createOrder(value);
    res.status(201).json(order);
  } catch (err) {
    if (err.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Product not found" });
    }

    if (err.message === "INSUFFICIENT_STOCK") {
      return res.status(409).json({ message: "Insufficient stock" });
    }

    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { createOrder: createOrderHandler };
