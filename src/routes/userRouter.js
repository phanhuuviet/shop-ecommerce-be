const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

router.get("/", userController.index);
router.post("/sign-up", userController.createUser);

module.exports = router;
