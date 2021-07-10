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
  "/categories/hardcoded",
  guard,
  Controllers.getHardCodedCategories,
);

// Routes to let users handle their own categories
categoriesRoutes
  .get("/categories", guard, Controllers.getCategories)
  .post("/categories", guard, validateCreatedCategory, Controllers.addCategory);

categoriesRoutes
  .get(
    "/categories/:categoryId",
    guard,
    validateMongoId,
    Controllers.getCategoryById,
  )
  .put(
    "/categories/:categoryId",
    guard,
    validateMongoId,
    validateUpdatedCategory,
    Controllers.updateCategoryById,
  )
  .delete(
    "/categories/:categoryId",
    guard,
    validateMongoId,
    Controllers.deleteCategoryById,
  );

module.exports = categoriesRoutes;
