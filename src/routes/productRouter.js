const express = require("express");
const productController = require("../controllers/productController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/:id", productController.getAnProduct);
router.post("/create", productController.createProduct);
router.put("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);
router.get("/", productController.index);

module.exports = router;
