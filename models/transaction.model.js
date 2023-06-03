const { Schema, model } = require("mongoose")

const transactionSchema = new Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    // required: [true, "Type is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: [true, "Category id is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  sum: {
    type: Number,
    required: [true, "Sum is required"],
  },
  date: {
    type: String,
    // match:
    required: [true, "Date is required"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Owner is required"],
  },
})

exports.TransactionModel = model("Transaction", transactionSchema)
