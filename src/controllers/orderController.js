const orderService = require("../services/orderService");

class orderController {
    // [POST] /create/:id
    async createOrder(req, res, next) {
        const {
            fullName,
            address,
            phone,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        } = req.body;
        if (
            !fullName ||
            !address ||
            !phone ||
            !paymentMethod ||
            !itemsPrice ||
            !shippingPrice ||
            !totalPrice
        ) {
            return res.status(200).json({
                status: "err",
                message: "You need to fill in all required fields",
            });
        }

        const response = await orderService.createOrder(req.body);
        res.status(200).json(response);
    }
}

module.exports = new orderController();
