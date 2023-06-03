exports.prepareUserWithToken = ({ user, token }) => ({
  email: user.email,
  token,
  type: user.type,
  balance: user.balance,
})

exports.prepareUser = ({ email, type, balance }) => ({ email, type, balance })

exports.prepareTransactions = (transactions) => {
  if (Array.isArray(transactions)) {
    return transactions.map((transaction) => ({
      id: transaction._id,
      type: transaction.type,
      category: transaction.category,
      description: transaction.description,
      sum: transaction.sum,
      date: transaction.date,
    }))
  }
  return {
    id: transactions._id,
    type: transactions.type,
    category: transactions.category,
    description: transactions.description,
    sum: transactions.sum,
    date: transactions.date,
  }
}
