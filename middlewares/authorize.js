const { asyncWrapper } = require("../middlewares/async-wrapper");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { UserModel } = require("../models/user.model");

exports.authorize = asyncWrapper(async (req, res, next) => {
  try {
    const authHeaderAuthorization = req.headers.authorization || "";
    const token = authHeaderAuthorization.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(payload.id);
    if (!user) {
      throw new Unauthorized("Not authorized");
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    next(new Unauthorized("Not authorized"));
  }
});
