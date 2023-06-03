const Joi = require("joi")

exports.createSchema = (key) => {
  return Joi.object({
    [key]: Joi.string().required(),
  })
}
