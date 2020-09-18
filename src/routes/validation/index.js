var Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  dateOfBirth: Joi.date().iso().required(),
});
