const { authService } = require("./auth.service")
const { userService } = require("./user.service")
const { transactionsService } = require("./transactions.service")
const { categoriesService } = require("./categories.service")

module.exports = {
  authService,
  userService,
  transactionsService,
  categoriesService,
}
