const express = require("express");
const orderController = require("../controllers/orderController");
const { authUserMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/:id", authUserMiddleware, orderController.getAnOrder);
router.post("/create", authUserMiddleware, orderController.createOrder);
router.delete("/:id", authUserMiddleware, orderController.cancelOrder);

module.exports = router;
