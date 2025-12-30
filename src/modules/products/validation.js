const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().max(50).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
});

module.exports = {
  createProductSchema,
};
