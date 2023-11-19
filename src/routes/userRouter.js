const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const {
    authMiddleware,
    authUserMiddleware,
    checkIsAdminOrIsSeller,
    authenticateToken,
} = require("../middlewares/authMiddleware");
const { imageMiddleware } = require("../middlewares/imageMiddleware");

// [GET]
router.get("/order", authUserMiddleware, userController.getAllOrder);
router.get("/product", checkIsAdminOrIsSeller, userController.getProduct);
router.get("/:id", userController.getAnUser);
// router.get("/:id", authUserMiddleware, userController.getAnUser);
router.get("/", userController.index);

// [POST]
router.post("/cart", authenticateToken, userController.addToCart);
router.post("/refresh-token", userController.refreshToken);
router.post("/sign-up", userController.createUser);
router.post("/delete-many", authMiddleware, userController.deleteMany);

// [PUT]
router.put("/:id", imageMiddleware, userController.updateUser);

// [DELETE]
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
