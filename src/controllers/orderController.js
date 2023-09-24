const orderService = require("../services/orderService");

class orderController {
    // [GET] /order/:id
    async getAnOrder(req, res, next) {
        const orderId = req.params?.id;

        if (!orderId) {
            res.status(200).json({
                status: "err",
                message: "Order id is required",
            });
        } else {
            const response = await orderService.getAnOrder(orderId);
            res.status(200).json(response);
        }
    }

    // [POST] /order/create
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

    // [DELETE] /order/:id
    async cancelOrder(req, res, next) {
        const orderId = req.params?.id;

        if (!orderId) {
            res.status(200).json({
                status: "err",
                message: "Order id is required",
            });
        } else {
            const response = await orderService.cancelOrder(orderId);
            res.status(200).json(response);
        }
    }
}

module.exports = new orderController();
