const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.post("/", chatController.createChat);
router.get("/get-messages/:chatId", chatController.getMessages);
router.get("/find/:firstId/:secondId", chatController.findChat);
router.get("/:userId", chatController.userChats);

module.exports = router;
