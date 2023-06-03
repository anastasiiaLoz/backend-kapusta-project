const { Router } = require("express")
const router = Router()

const { asyncWrapper, validate, authorize } = require("../middlewares/middlewares")
const { balanceSchema } = require("../validation/schemes/balance.schema")
const { userService } = require("../services/user.service")
const { prepareUser } = require("../serializers")

router.post(
  "/balance",
  authorize,
  validate(balanceSchema),
  asyncWrapper(async (req, res, _) => {
    const balance = await userService.setBalance(req.user._id, req.body.balance)

    res.status(200).json({ balance })
  })
)

router.get(
  "/",
  authorize,
  asyncWrapper(async (req, res, _) => {
    const user = await userService.getCurrentUser(req.user._id)

    res.status(200).json(prepareUser(user))
  })
)

exports.userController = router
