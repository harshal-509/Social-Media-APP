const authController = require("../controllers/authController");
const router = require("express").Router();

router.post("/signup", authController.signupController);
router.post("/login", authController.loginController);
router.get("/refresh", authController.refreshAcessTokenController);
router.get("/logout", authController.logoutController);

module.exports = router;
