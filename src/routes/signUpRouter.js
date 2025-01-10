const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { decodePayloadMiddleware } = require("../middlewares/decodePayload");

router.post("/", decodePayloadMiddleware, userController.createUser);

module.exports = router;
