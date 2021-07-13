const { Router } = require("express");
const guard = require("../middleware/auth-middleware");
const validateMongoId = require("../validaton/mongo-id-validation");
const {
  validateCreatedCategory,
  validateUpdatedCategory,
} = require("../validaton/categories-validation");
const Controllers = require("../controllers/categories-controllers");

const categoriesRoutes = Router();

// Temp route to return hard coded categories from the Spec
categoriesRoutes.get(
  "/hardcoded",
  guard,
  Controllers.getHardCodedCategories,
);

// Routes to let users handle their own categories
categoriesRoutes
  .get("/", guard, Controllers.getCategories)
  .post("/", guard, validateCreatedCategory, Controllers.addCategory);

categoriesRoutes
  .get(
    "/:categoryId",
    guard,
    validateMongoId,
    Controllers.getCategoryById,
  )
  .put(
    "/:categoryId",
    guard,
    validateMongoId,
    validateUpdatedCategory,
    Controllers.updateCategoryById,
  )
  .delete(
    "/:categoryId",
    guard,
    validateMongoId,
    Controllers.deleteCategoryById,
  );

module.exports = categoriesRoutes;
