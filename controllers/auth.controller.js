const { Router } = require("express");
const router = Router();

const { asyncWrapper, validate, authorize } = require("../middlewares/middlewares");
const { userSignUpSchema, userSignInSchema } = require("../validation/schemes/auth.schema");
const { authService } = require("../services/auth.service");
const { prepareUser, prepareUserWithToken } = require("../serializers");

router.post(
  "/signup",
  validate(userSignUpSchema),
  asyncWrapper(async (req, res, _) => {
    const user = await authService.signUp(req.body);

    const response = {
      message: "User has been created",
      user: prepareUser(user)
    };

    res.status(201).json(response);
  })
);

router.post(
  "/signin",
  validate(userSignInSchema),
  asyncWrapper(async (req, res, _) => {
    const userWithToken = await authService.signIn(req.body);

    const response = {
      message: "User has been signed in",
      user: prepareUserWithToken(userWithToken)
    };

    res.status(200).json(response);
  })
);

router.post(
  "/signout",
  authorize,
  asyncWrapper(async (req, res, _) => {
    await authService.signOut(req.user);

    res.status(204).send();
  })
);

exports.authController = router;
