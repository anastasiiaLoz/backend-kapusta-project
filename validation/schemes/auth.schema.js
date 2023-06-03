const Joi = require("joi");
const { userTypes } = require("../../variables/user-types");

exports.userSignUpSchema = Joi.object({
  email: Joi.string()
    .email()
    .trim(true)
    .required(),
  password: Joi.string()
    .min(4)
    .trim(true)
    .required(),
  type: Joi.string().valid(...userTypes)
});

exports.userSignInSchema = Joi.object({
  email: Joi.string()
    .email()
    .trim(true)
    .required(),
  password: Joi.string()
    .min(4)
    .trim(true)
    .required()
});
