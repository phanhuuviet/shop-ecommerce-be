const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

router.get("/", userController.index);
router.post("/", userController.createUser);

module.exports = router;
