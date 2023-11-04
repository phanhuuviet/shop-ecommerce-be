const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.post("/", chatController.createChat);
router.post("/:userId", chatController.userChats);
router.get("/find/:firstId/:secondId", chatController.findChat);

module.exports = router;
