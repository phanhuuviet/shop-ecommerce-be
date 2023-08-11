const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const {
    authMiddleware,
    authUserMiddleware,
} = require("../middlewares/authMiddleware");

router.get("/refresh-token", userController.refreshToken);
router.get("/:id", authUserMiddleware, userController.getAnUser);
router.post("/sign-up", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get("/", authMiddleware, userController.index);

module.exports = router;
