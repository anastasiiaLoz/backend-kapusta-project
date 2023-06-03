const { asyncWrapper } = require("../middlewares/async-wrapper")
const Joi = require("joi").extend(require("@joi/date"))
const { expenseCategories, incomeCategories } = require("../variables/categories")

exports.validateTransaction = asyncWrapper(async (req, res, next) => {
  let validCategories = []

  if (req.body.type === "expense") validCategories = expenseCategories
  if (req.body.type === "income") validCategories = incomeCategories

  const schema = Joi.object({
    type: Joi.string().valid("expense", "income").required(),
    category: Joi.string()
      .valid(...validCategories)
      .required(),
    sum: Joi.number().required(),
    description: Joi.string(),
    date: Joi.date().format("DD.MM.YYYY").required(),
  })

  const { error } = schema.validate(req.body)

  if (error) return res.status(error.status || 400).send(error)

  next()
})
