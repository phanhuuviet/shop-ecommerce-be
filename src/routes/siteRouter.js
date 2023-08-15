const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");

router.get("/", siteController.index);
router.post("/log-out", siteController.logout);

module.exports = router;
