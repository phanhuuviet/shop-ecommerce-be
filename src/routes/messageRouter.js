const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/", messageController.addMessage);
router.get("/:chatId", messageController.getMessages);

module.exports = router;
