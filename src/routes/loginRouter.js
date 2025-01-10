const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { decodePayloadMiddleware } = require("../middlewares/decodePayload");

router.post("/", decodePayloadMiddleware, authController.login);

// route for login with no sql injection
router.post("/login_noSqlInjection", authController.login_noSqlInjection);

// don't use
router.post(
    "/login_withPreventNoSqlInjection",
    authController.login_withPreventNoSqlInjection
);

module.exports = router;
