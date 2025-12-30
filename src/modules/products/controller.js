const { getProducts } = require("./queries/getProducts");
const { createProduct } = require("./commands/createProduct");
const { createProductSchema } = require("./validation");

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

module.exports = {
  getProducts: getProductsHandler,
  createProduct: createProductHandler,
};
