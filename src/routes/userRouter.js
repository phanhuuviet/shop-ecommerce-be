const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

router.get("/", userController.index);
router.post("/sign-up", userController.createUser);
router.put("/:id", userController.updateUser);

module.exports = router;
