const Joi = require('joi');
const validatorHandler = require('../../middlewares/validatorHandlers')

const username = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);

const registerSchema = Joi.object({
  username: username.required(),
  email: email.required(),
  password: password.required()
});

const loginSchema = Joi.object({
  email: email.required().email(),
  password: password.required()
});

const registerValidator = validatorHandler(registerSchema)
const loginValidator = validatorHandler(loginSchema)

module.exports = { registerValidator, loginValidator }