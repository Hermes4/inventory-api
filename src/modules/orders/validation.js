const Joi = require("joi");

const createOrderSchema = Joi.object({
  customerId: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().positive().required(),
      })
    )
    .min(1)
    .required(),
});

module.exports = { createOrderSchema };
