const orderService = require("../services/orderService");

class orderController {
    // [GET] /order/:id
    async getAnOrder(req, res, next) {
        try {
            const orderId = req.params?.id;

            if (!orderId) {
                res.status(400).json({
                    message: "Order id is required",
                });
            } else {
                const response = await orderService.getAnOrder(orderId);
                res.status(200).json(response);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal server error!",
            });
        }
    }

    // [POST] /order/create
    async createOrder(req, res, next) {
        try {
            const order = req.body;
            order?.forEach((orderItem) => {
                const {
                    fullName,
                    address,
                    phone,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                } = orderItem;
                if (
                    !fullName ||
                    !address ||
                    !phone ||
                    !paymentMethod ||
                    !itemsPrice ||
                    !shippingPrice ||
                    !totalPrice
                ) {
                    return res.status(400).json({
                        message: "You need to fill in all required fields",
                    });
                }
            });

            const responses = await Promise.all(
                order.map(async (orderItem) => {
                    const response = await orderService.createOrder(orderItem);
                    return response;
                })
            );
            res.status(200).json(responses);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal server error!",
            });
        }
    }

    // [PUT] /order/:id/paid
    async paidOrder(req, res, next) {
        try {
            const orderId = req.params?.id;
            const userId = req.userId;
            console.log("orderId", orderId);
            console.log("userId", userId);

            if (!orderId) {
                res.status(400).json({
                    message: "Order id is required",
                });
            } else {
                const response = await orderService.paidOrder({
                    orderId,
                    userId,
                });
                res.status(200).json(response);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal server error!",
            });
        }
    }

    // [DELETE] /order/:id
    async cancelOrder(req, res, next) {
        try {
            const orderId = req.params?.id;

            if (!orderId) {
                res.status(400).json({
                    message: "Order id is required",
                });
            } else {
                const response = await orderService.cancelOrder(orderId);
                res.status(200).json(response);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal server error!",
            });
        }
    }
}

module.exports = new orderController();
