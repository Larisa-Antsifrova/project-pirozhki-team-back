const { Router } = require('express');

const authRoutes = Router();
const authController = require('../controllers/auth-controllers');
// const { schemaCreateUser, shemaUpdateSubscription } = require("../validaton/auth-validation");
// const guard = require("../middleware/auth-middleware");

authRoutes.post('/registration', authController.registration);
authRoutes.post('/login', authController.login);
authRoutes.post('/logout', authController.logout);
authRoutes.get('/refresh', authController.refresh);

authRoutes.get('/users', authController.getUsers);

module.exports = authRoutes;
