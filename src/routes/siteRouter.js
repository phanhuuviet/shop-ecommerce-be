const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");
const { decodePayloadMiddleware } = require("../middlewares/decodePayload");

router.get("/", siteController.index);
router.post("/decoded", decodePayloadMiddleware, siteController.decodedPayload);
router.post("/log-out", siteController.logout);

module.exports = router;
