const { Router } = require("express");
const router = Router();

const { asyncWrapper, validate, authorize, createSchema } = require("../middlewares/middlewares");
const { categoriesService } = require("../services/services");
const { typeSchema } = require("../validation/schemes/transactions.schemes");

router.get(
  "/:type",
  authorize,
  validate(typeSchema, "params"),
  asyncWrapper(async (req, res, _) => {
    const categories = await categoriesService.getCategories(req.params.type);

    res.status(200).json({ categories });
  })
);

router.post(
  "/:type",
  authorize,
  validate(typeSchema, "params"),
  validate(createSchema("name")),
  asyncWrapper(async (req, res, _) => {
    const { name, type } = await categoriesService.addCategory(req.user, req.body.name, req.params.type);

    const response = {
      message: "Category has been created",
      category: { name, type }
    };

    res.status(201).json(response);
  })
);

router.delete(
  "/:category",
  authorize,
  validate(createSchema("category"), "params"),
  asyncWrapper(async (req, res, _) => {
    await categoriesService.deleteCategory(req.user, req.params.category);

    res.status(200).json({ message: "Category has been deleted" });
  })
);

exports.categoriesController = router;
