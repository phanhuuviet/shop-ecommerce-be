const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, userController.index);
router.get("/:id", userController.getAnUser);
router.post("/sign-up", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
