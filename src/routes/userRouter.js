const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const {
    authMiddleware,
    authUserMiddleware,
    checkIsAdminOrIsSeller,
} = require("../middlewares/authMiddleware");
const { imageMiddleware } = require("../middlewares/imageMiddleware");

router.get("/order", authUserMiddleware, userController.getAllOrder);
router.get("/product", checkIsAdminOrIsSeller, userController.getProduct);
router.get("/:id", userController.getAnUser);
// router.get("/:id", authUserMiddleware, userController.getAnUser);
router.get("/", authMiddleware, userController.index);
router.post("/refresh-token", userController.refreshToken);
router.post("/sign-up", userController.createUser);
router.post("/delete-many", authMiddleware, userController.deleteMany);
router.put("/:id", imageMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
