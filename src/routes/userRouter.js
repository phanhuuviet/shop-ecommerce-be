const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const {
    authMiddleware,
    authUserMiddleware,
    checkIsAdminOrIsSeller,
    authenticateToken,
    authenticateTokenIfHas,
} = require("../middlewares/authMiddleware");
const { imageMiddleware } = require("../middlewares/imageMiddleware");

// [GET]
router.get("/order", authenticateToken, userController.getAllOrder);
router.get("/product", checkIsAdminOrIsSeller, userController.getProduct);
router.get("/me", authenticateToken, userController.getMe);
router.get("/cart", authenticateToken, userController.getCart);
router.get("/following", authenticateToken, userController.getFollowingShop);
router.get("/:id/shop", authenticateTokenIfHas, userController.getShop);
router.get("/:id", userController.getAnUser);
router.get("/", userController.index);

// [POST]
router.post("/cart", authenticateToken, userController.addToCart);
router.post("/refresh-token", userController.refreshToken);
router.post("/sign-up", userController.createUser);
router.post("/delete-many", authMiddleware, userController.deleteMany);
router.post("/follow", authenticateToken, userController.followShop);
router.post("/unFollow", authenticateToken, userController.unFollowShop);

// [PUT]
router.put(
    "/change-password",
    authenticateToken,
    userController.changePasswordUser
);
router.put(
    "/cart/:id",
    authenticateToken,
    userController.increaseAmountProductInCart
);
router.put(
    "/:id",
    authenticateToken,
    imageMiddleware,
    userController.updateUser
);

// [DELETE]
router.delete("/cart/:id", authenticateToken, userController.deleteCart);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
