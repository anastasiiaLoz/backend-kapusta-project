const Joi = require("joi").extend(require("@joi/date"))

exports.typeSchema = exports.summarySchema = Joi.object({
  type: Joi.string().valid("expense", "income").required(),
})

exports.summarySchema = Joi.object({
  type: Joi.string().valid("expense", "income").required(),
  year: Joi.date().format("YYYY").required(),
})

exports.periodSchema = Joi.object({
  type: Joi.string().valid("expense", "income").required(),
  period: Joi.date().format("MM.YYYY").required(),
})
