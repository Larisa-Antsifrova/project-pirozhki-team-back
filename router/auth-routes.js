const { Router } = require('express');
const guard = require('../middleware/auth-middleware');
const {
  validateCreatedUser,
  validateLoggedinUser
} = require('../validaton/auth-validation');
const Controllers = require('../controllers/auth-controllers');

const authRoutes = Router();

authRoutes.post('/registration', validateCreatedUser, Controllers.registration);
authRoutes.post('/login', validateLoggedinUser, Controllers.login);
authRoutes.post('/logout', guard, Controllers.logout);
authRoutes.get('/refresh', guard, Controllers.refresh);

module.exports = authRoutes;
