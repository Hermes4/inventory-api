const { getProducts } = require("./queries/getProducts");
const { createProduct } = require("./commands/createProduct");
const { createProductSchema } = require("./validation");

const { restockProduct } = require("./commands/restockProduct");
const { restockSchema } = require("./validation");

const { sellProduct } = require("./commands/sellProduct");

async function getProductsHandler(req, res) {
  const products = await getProducts();
  res.status(200).json(products);
}

async function createProductHandler(req, res) {
  const { error, value } = createProductSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const product = await createProduct(value);
  res.status(201).json(product);
}

async function restockProductHandler(req, res) {
  const { id } = req.params;

  const { error, value } = restockSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const updatedProduct = await restockProduct(id, value.amount);
    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(500).json({ message: "Server error" });
  }
}

async function sellProductHandler(req, res) {
  const { id } = req.params;

  const { error, value } = restockSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const updatedProduct = await sellProduct(id, value.amount);
    res.status(200).json(updatedProduct);
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

module.exports = {
  getProducts: getProductsHandler,
  createProduct: createProductHandler,
  restockProduct: restockProductHandler,
  sellProduct: sellProductHandler,
};
