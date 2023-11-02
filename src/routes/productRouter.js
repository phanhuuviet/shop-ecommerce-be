const express = require("express");
const productController = require("../controllers/productController");
const {
    authMiddleware,
    authenticateToken,
} = require("../middlewares/authMiddleware");
const { imageMiddleware } = require("../middlewares/imageMiddleware");
const router = express.Router();

router.get("/get-all-type", productController.getAllType);
router.get("/:id", productController.getAnProduct);
router.get("/", productController.index);
router.post("/create", imageMiddleware, productController.createProduct);
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
router.put("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
