const { Conflict, NotFound, Unauthorized } = require("http-errors")
const { UserModel } = require("../models/user.model")
const jwt = require("jsonwebtoken")
const uuid = require("uuid")

exports.authService = {
  signUp: async ({ email, password, type = "user" }) => {
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      throw new Conflict(`User with email '${email}' already exists`)
    }
    const newUser = await UserModel.create({
      email,
      password: await UserModel.hashPassword(password),
      verificationToken: uuid.v4(),
      type,
    })
    return newUser
  },

  signIn: async ({ email, password }) => {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new NotFound(`User with email '${email}' not found`)
    }
    const isPasswordCorrect = await UserModel.isPasswordCorrect(password, user.password)
    if (!isPasswordCorrect) {
      throw new Unauthorized(`Provided password is wrong`)
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    // await UserModel.findOneAndUpdate({ email }, { token, isActive: true, verificationToken: null })
    await UserModel.findOneAndUpdate({ email }, { token, verificationToken: null })

    return { user, token }
  },

  signOut: async ({ _id }) => {
    // await UserModel.findByIdAndUpdate(_id, { token: null, isActive: false })
    await UserModel.findByIdAndUpdate(_id, { token: null })
  },
}
