const express = require("express");
const orderController = require("../controllers/orderController");
const {
    authUserMiddleware,
    authenticateToken,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/:id", orderController.getAnOrder);
router.post("/create", authenticateToken, orderController.createOrder);
router.put("/:id/paid", authenticateToken, orderController.paidOrder);
router.delete("/:id", authUserMiddleware, orderController.cancelOrder);

module.exports = router;
