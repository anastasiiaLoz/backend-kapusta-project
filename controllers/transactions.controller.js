const { Router } = require("express")
const router = Router()

const { asyncWrapper, validate, authorize, createSchema } = require("../middlewares/middlewares")
const { validateTransaction } = require("../validation/validate-transaction")
const { typeSchema, summarySchema, periodSchema } = require("../validation/schemes/transactions.schemes")
const { transactionsService } = require("../services/transactions.service")
const { prepareTransactions } = require("../serializers")

router.post(
  "/",
  authorize,
  validateTransaction,
  asyncWrapper(async (req, res, _) => {
    const transaction = await transactionsService.addTransaction(req.user._id, req.body)

    const response = {
      message: "Transaction has been created",
      transaction: prepareTransactions(transaction),
    }

    res.status(201).json(response)
  })
)

router.delete(
  "/:id",
  authorize,
  validate(createSchema("id"), "params"),
  asyncWrapper(async (req, res, _) => {
    const transaction = await transactionsService.deleteTransaction(req.user._id, req.params.id)

    const response = {
      message: "Transaction has been deleted",
      transaction: prepareTransactions(transaction),
    }

    res.status(200).json(response)
  })
)

router.get(
  "/:type",
  authorize,
  validate(typeSchema, "params"),
  asyncWrapper(async (req, res, _) => {
    const transactions = await transactionsService.getTransactions(req.user._id, req.params.type)

    res.status(200).json(prepareTransactions(transactions))
  })
)

router.get(
  "/summary/:type/:year",
  authorize,
  validate(summarySchema, "params"),
  asyncWrapper(async (req, res, _) => {
    const summary = await transactionsService.getSummary(req.user._id, req.params)

    res.status(200).json(summary)
  })
)

router.get(
  "/:type/:period",
  authorize,
  validate(periodSchema, "params"),
  asyncWrapper(async (req, res, _) => {
    const transactions = await transactionsService.getTransactionsForPeriod(req.user._id, req.params)

    res.status(200).json(prepareTransactions(transactions))
  })
)

exports.transactionsController = router
