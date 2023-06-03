const { TransactionModel, UserModel, CategoryModel } = require("../models/models")
const { BadRequest, Forbidden } = require("http-errors")
// const { Schema } = require("mongoose")
const { ObjectId } = require("mongodb")
const { userService } = require("./user.service")

exports.transactionsService = {
  addTransaction: async (userId, transaction) => {
    const category = await CategoryModel.findOne({ name: transaction.category, type: transaction.type })

    const createdTransaction = await TransactionModel.create({
      ...transaction,
      owner: userId,
      categoryId: category._id,
    })

    await userService.updateBalance(userId, transaction, "add")

    return createdTransaction
  },

  deleteTransaction: async (userId, id) => {
    const transaction = await TransactionModel.findById(id)

    if (!transaction) throw new BadRequest(`There is no transaction with id '${id}'`)

    if (transaction.owner.toString() !== userId.toString()) throw new Forbidden(`You can't delete this transaction`)

    await TransactionModel.findByIdAndDelete(id)

    await userService.updateBalance(userId, transaction, "delete")

    return transaction
  },

  getTransactions: async (userId, type) => {
    const transactions = await TransactionModel.find({ owner: new ObjectId(userId), type })

    return transactions
  },

  getSummary: async (userId, { type, year }) => {
    const transactions = await TransactionModel.find({ owner: new ObjectId(userId), type, date: { $regex: year } })

    const months = {
      "01": "jan",
      "02": "feb",
      "03": "mar",
      "04": "apr",
      "05": "may",
      "06": "jun",
      "07": "jul",
      "08": "aug",
      "09": "sep",
      10: "oct",
      11: "nov",
      12: "dec",
    }

    const summary = {
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    }

    transactions.forEach((transaction) => {
      const transactionMonth = transaction.date.split(".")[1]
      const month = months[transactionMonth]
      summary[month] += transaction.sum
    })

    return summary
  },

  getTransactionsForPeriod: async (userId, { type, period }) => {
    // let transactions = await TransactionModel.find({ owner: new Schema.Types.ObjectId(userId), type }) //! Schema.Types.ObjectId не работает
    const transactions = await TransactionModel.find({ owner: new ObjectId(userId), type, date: { $regex: period } })

    return transactions
  },
}
