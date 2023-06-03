const Joi = require("joi")

exports.balanceSchema = Joi.object({
  balance: Joi.number().required(),
})
