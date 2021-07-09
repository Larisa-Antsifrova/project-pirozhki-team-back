const { Router } = require('express');
const guard = require('../middleware/auth-middleware');
const Controllers = require('../controllers/categories-controllers');

const categoriesRoutes = Router();

categoriesRoutes.get('/categories', guard, Controllers.getAllCategories);

module.exports = categoriesRoutes;
