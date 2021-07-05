// other:
// /auth/refreshToken - или как-то по-другому его назвать - ендпойнт для того, чтобы перевыдать пару рефреш и эксесс токенов

const { Router } = require('express');

const authRoutes = Router();
const authController = require('../controllers/auth-controllers');
// const { schemaCreateUser, shemaUpdateSubscription } = require("../validaton/auth-validation");
// const guard = require("../middleware/auth-middleware");

authRoutes.post('/registration', authController.registration);
authRoutes.post('/login', authController.login);
authRoutes.post('/logout', authController.logout);

authRoutes.get('/users', authController.getUsers);

module.exports = authRoutes;
