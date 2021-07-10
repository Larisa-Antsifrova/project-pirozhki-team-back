const { Router } = require('express');
const guard = require('../middleware/auth-middleware');
const Controllers = require('../controllers/categories-controllers');

const categoriesRoutes = Router();

categoriesRoutes.get(
  '/categories/hardcoded',
  guard,
  Controllers.getHardCodedCategories
);

categoriesRoutes
  .get('/categories', guard, Controllers.getCategories)
  .post('/categories', guard, Controllers.addCategory);

categoriesRoutes
  .get('/categories/:categoryId', guard, Controllers.getCategoryById)
  .put('/categories/:categoryId', guard, Controllers.updateCategoryById)
  .delete('/categories/:categoryId', guard, Controllers.deleteCategoryById);

module.exports = categoriesRoutes;
