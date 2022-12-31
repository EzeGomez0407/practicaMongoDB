const Joi = require("joi");

const schemaRegister = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string()
    .min(12)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().min(8).required(),
});

const schemaLogin = Joi.object({
  email: Joi.string()
    .min(12)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().min(8).required(),
});

module.exports = {
  schemaLogin,
  schemaRegister,
};
