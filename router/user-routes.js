const { Router } = require("express");
const userRoutes = Router();
const guard = require("../middleware/auth-middleware");
const userController = require("../controllers/user-controllers");

userRoutes.get("/user/current", guard, userController.getCurrentUser);

module.exports = userRoutes;
