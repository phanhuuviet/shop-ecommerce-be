const Order = require("../models/OrderProductModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../models/ProductModel");

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const stockStatus = await Promise.all(
            newOrder?.data.map(async (item) => {
                const product = await Product.findById(item.product);
                return {
                    productId: item.product,
                    availableStock: product.countInStock, // Lấy số lượng hàng có sẵn trong kho
                    orderedQuantity: item.amount, // Số lượng hàng đặt hàng
                };
            })
        );

        const insufficientStock = stockStatus.every(
            (item) => item.availableStock > item.orderedQuantity
        );

        const updateStockAfterOrder = (products) => {
            products.map(async (product) => {
                await Product.findOneAndUpdate(
                    {
                        _id: product.product,
                    },
                    {
                        $inc: {
                            countInStock: -product.amount,
                            sold: +product.amount,
                        },
                    }
                );
            });
        };

        if (insufficientStock) {
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
                isPaid,
                paidAt,
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
                    isPaid,
                    paidAt,
                });

                await updateStockAfterOrder(data);

                resolve({
                    status: "OK",
                    message: "successfully",
                    data: createOrder,
                });
            } catch (err) {
                reject(err);
            }
        } else {
            resolve({
                status: "err",
                message: "Out of stock",
                data: createOrder,
            });
        }
    });
};

const getAnOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Order.findOne({ _id: orderId });
            if (data) {
                resolve({
                    status: "OK",
                    message: "successfully",
                    data: data,
                });
            } else {
                resolve({
                    status: "err",
                    message: "Order is not exist",
                });
            }
        } catch (error) {
            reject(err);
        }
    });
};

const paidOrder = ({ orderId, userId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Order.findOne({ _id: orderId, user: userId });
            if (!data) {
                resolve({
                    status: "OK",
                    message: "Order is not exist",
                });
            } else {
                const res = await Order.findByIdAndUpdate(
                    orderId,
                    {
                        isPaid: true,
                        isDelivered: true,
                    },
                    { new: true }
                );
                resolve({
                    status: "OK",
                    message: "Paid for order success",
                    data: res,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const cancelOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Order.deleteOne({ _id: orderId });
            if (data) {
                resolve({
                    status: "OK",
                    message: "successfully",
                    data: data,
                });
            } else {
                resolve({
                    status: "err",
                    message: "Order is not exist",
                });
            }
        } catch (error) {
            reject(err);
        }
    });
};

module.exports = {
    createOrder,
    getAnOrder,
    cancelOrder,
    paidOrder,
};
