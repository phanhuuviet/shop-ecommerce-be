const express = require("express");
const productController = require("../controllers/productController");
const {
    authMiddleware,
    authenticateToken,
    checkIsAdminOrIsSeller,
} = require("../middlewares/authMiddleware");
const { imageMiddleware } = require("../middlewares/imageMiddleware");
const router = express.Router();

router.get("/get-all-type", productController.getAllType);
router.get("/top", productController.getTopProduct);
router.get("/:id", productController.getAnProduct);
router.get("/", productController.index);
router.post(
    "/create",
    checkIsAdminOrIsSeller,
    imageMiddleware,
    productController.createProduct
);
router.post(
    "/delete-many",
    authMiddleware,
    productController.deleteManyProduct
);
router.post(
    "/:id/favorite",
    authenticateToken,
    productController.favoriteProduct
);
router.post(
    "/:id/unfavorite",
    authenticateToken,
    productController.unFavoriteProduct
);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
