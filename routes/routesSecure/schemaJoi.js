const Joi = require("joi");

const joiSchemaPet = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  age: Joi.number().required(),
  type: Joi.string().max(30).required(),
});

module.exports = joiSchemaPet;
