const { Router } = require('express');
const {
  validateCreatedUser,
  validateLoggedinUser
} = require('../validaton/auth-validation');
const guard = require('../middleware/auth-middleware');
const authController = require('../controllers/auth-controllers');

const authRoutes = Router();

authRoutes.post(
  '/registration',
  validateCreatedUser,
  authController.registration
);
authRoutes.post('/login', validateLoggedinUser, authController.login);
authRoutes.post('/logout', guard, authController.logout);
authRoutes.get('/refresh', guard, authController.refresh);

module.exports = authRoutes;
