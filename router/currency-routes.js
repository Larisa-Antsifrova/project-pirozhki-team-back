const { Router } = require('express');
const guard = require('../middleware/auth-middleware');
const Controllers = require('../controllers/currency-controllers');

const currencyRoutes = Router();

currencyRoutes.get('/', guard, Controllers.getCurrencies);

module.exports = currencyRoutes;
