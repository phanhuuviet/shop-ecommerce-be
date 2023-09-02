const express = require("express");
const productController = require("../controllers/productController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/get-all-type", productController.getAllType);
router.get("/:id", productController.getAnProduct);
router.get("/", productController.index);
router.post("/create", productController.createProduct);
router.post(
    "/delete-many",
    authMiddleware,
    productController.deleteManyProduct
);
router.put("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
