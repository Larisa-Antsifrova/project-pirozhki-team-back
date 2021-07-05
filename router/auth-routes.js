// other:
// /auth/refreshToken - или как-то по-другому его назвать - ендпойнт для того, чтобы перевыдать пару рефреш и эксесс токенов

const { Router } = require("express");

const router = Router();
const authController = require("../controllers/auth-controllers");
// const { schemaCreateUser, shemaUpdateSubscription } = require("./users.validation");
// const guard = require("../../../helpers/guard");

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/users", authController.getUsers);

module.exports = router;
