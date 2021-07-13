const { Router } = require('express');
const guard = require('../middleware/auth-middleware');
const {
  validateStatisticsQuery
} = require('../validaton/statistics-validation');
const Controllers = require('../controllers/statistics-controllers');

const statisticsRoutes = Router();

statisticsRoutes.get(
  '/',
  guard,
  validateStatisticsQuery,
  Controllers.getStatistics
);

module.exports = statisticsRoutes;
