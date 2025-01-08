const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.login);
router.post("/login_noSqlInjection", authController.login_noSqlInjection);
router.post(
    "/login_withPreventNoSqlInjection",
    authController.login_withPreventNoSqlInjection
);

module.exports = router;
