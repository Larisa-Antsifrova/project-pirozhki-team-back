const { Router } = require("express");
const authController = require("../controllers/auth-controllers");
const { schemaCreateUser } = require("../validaton/auth-validation");
const guard = require("../middleware/auth-middleware");

const authRoutes = Router();

authRoutes.post("/registration", schemaCreateUser, authController.registration);
authRoutes.post("/login", schemaCreateUser, authController.login);
authRoutes.post("/logout", guard, authController.logout);
authRoutes.get("/refresh", guard, authController.refresh);

module.exports = authRoutes;
