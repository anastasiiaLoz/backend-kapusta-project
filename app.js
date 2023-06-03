const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")
const logger = require("morgan")
const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("./swagger-ui/swagger.json")

const {
  authController,
  userController,
  transactionsController,
  categoriesController,
} = require("./controllers/controllers")

const app = express()

dotenv.config({ path: path.join(__dirname, ".env") })

const { PORT = 4000 } = process.env

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB🔥🔥🔥")
    app.listen(PORT, () => {
      console.log(`Server's running. Woooohoooo!! It's chilling on ${PORT} port 😎`)
    })
  })
  .catch((err) => console.log("Something went wrong. Database is not connected:", err))

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(
  "/api-docs",
  function (req, res, next) {
    swaggerDocument.host = req.get("http://localhost:3000/api-docs")
    req.swaggerDoc = swaggerDocument
    next()
  },
  swaggerUI.serve,
  swaggerUI.setup()
)

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use("/api/v1/auth", authController)
app.use("/api/v1/user", userController)
app.use("/api/v1/transactions", transactionsController)
app.use("/api/v1/categories", categoriesController)
app.use("*", (_, res) => res.status(404).json({ message: "This endpoint isn't correct" }))

app.use((err, _, res, __) => {
  res.status(err.status || 500).json({ message: err.message })
})
