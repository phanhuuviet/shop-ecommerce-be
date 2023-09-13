const Order = require("../models/OrderProductModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const {
            userId,
            fullName,
            address,
            phone,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            data,
        } = newOrder;
        try {
            // Create order
            const createOrder = await Order.create({
                orderItems: data,
                shippingAddress: {
                    fullName,
                    address,
                    phone,
                },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                taxPrice: 0.05,
                user: userId,
            });
            resolve({
                status: "OK",
                message: "successfully",
                data: createOrder,
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    createOrder,
};
