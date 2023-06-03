const { Forbidden, BadRequest } = require("http-errors")
const { CategoryModel } = require("../models/models")

exports.categoriesService = {
  getCategories: async (type) => {
    let categories = await CategoryModel.find({ type })

    categories = categories.map(({ name }) => name)

    return categories
  },

  addCategory: async (user, categoryName, type) => {
    if (user.type !== "admin") throw new Forbidden("You cannot add any categories")

    const createdCategory = await CategoryModel.create({ type, name: categoryName })

    return createdCategory
  },

  deleteCategory: async (user, categoryName) => {
    if (user.type !== "admin") throw new Forbidden("You cannot delete any categories")

    const category = await CategoryModel.findOneAndDelete({ name: categoryName })

    if (!category) throw new BadRequest(`There is no category '${categoryName}' in database`)
  },
}
