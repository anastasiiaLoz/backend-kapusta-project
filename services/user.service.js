const { UserModel } = require("../models/models")

exports.userService = {
  setBalance: async (id, balance) => {
    const updatedUser = await UserModel.findByIdAndUpdate(id, { balance }, { new: true })

    return updatedUser.balance
  },

  updateBalance: async (userId, { type, sum }, action) => {
    const user = await UserModel.findById(userId)
    let balance

    if (action === "add") balance = type === "expense" ? user.balance - sum : user.balance + sum
    if (action === "delete") balance = type === "expense" ? user.balance + sum : user.balance - sum

    await UserModel.findByIdAndUpdate(userId, { balance })
  },

  getCurrentUser: async (userId) => {
    const user = await UserModel.findById(userId)

    return user
  },
}
