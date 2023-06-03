const { authController } = require("./auth.controller")
const { userController } = require("./user.controller")
const { transactionsController } = require("./transactions.controller")
const { categoriesController } = require("./categories.controller")

module.exports = {
  authController,
  userController,
  transactionsController,
  categoriesController,
}
