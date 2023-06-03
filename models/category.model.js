const { Schema, model } = require("mongoose")

const categorySchema = new Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    // required: [true, "Type is required"],
  },
  name: {
    type: String,
    // required: [true, "Category is required"],
  },
})

exports.CategoryModel = model("Category", categorySchema)
