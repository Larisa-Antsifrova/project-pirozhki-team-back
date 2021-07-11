const { Router } = require('express');
const guard = require('../middleware/auth-middleware');
const Controllers = require('../controllers/user-controllers');

const userRoutes = Router();

userRoutes.get('/user/current', guard, Controllers.getCurrentUser);

module.exports = userRoutes;
