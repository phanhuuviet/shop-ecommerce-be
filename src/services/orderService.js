const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Order = require("../models/OrderProductModel");
const Product = require("../models/ProductModel");
const Cart = require("../models/CartModel");
const User = require("../models/UserModel");
const { ROLE_ADMIN } = require("../constants/role");

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const updateStockAfterOrder = (products) => {
            products.map(async (product) => {
                await Promise.all([
                    Product.findOneAndUpdate(
                        {
                            _id: product.product,
                        },
                        {
                            $inc: {
                                countInStock: -product.amount,
                                sold: +product.amount,
                            },
                        }
                    ),
                    Cart.findByIdAndDelete(product?.cartId),
                ]);
            });
        };

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

        if (insufficientStock) {
            const {
                userId,
                fullName,
                address,
                phone,
                shopId,
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
                    shopId,
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
            reject(error);
        }
    });
};

const paidOrder = ({ orderId, userId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Order.findOne({ _id: orderId, user: userId });

            if (!data) {
                return resolve({
                    status: "OK",
                    message: "Order does not exist",
                });
            }

            if (data.shopId) {
                const totalPrice = +data.totalPrice;
                const shopUpdate = User.findByIdAndUpdate(data.shopId, {
                    $inc: { totalMoney: totalPrice * 0.95 },
                });

                const adminUpdate = User.updateMany(
                    { role: ROLE_ADMIN },
                    { $inc: { floorMoney: totalPrice * 0.05 } }
                );

                await Promise.all([shopUpdate, adminUpdate]);
            }

            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                {
                    isPaid: true,
                    isDelivered: true,
                },
                { new: true }
            );

            resolve({
                status: "OK",
                message: "Paid for order successfully",
                data: updatedOrder,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const cancelOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Order.findById(orderId);
            if (!data) {
                return resolve({
                    statusCode: 404,
                    message: "Order is not exist",
                });
            }
            // loop through orderItems and plus back quantity to the product
            data?.orderItems?.map(async (item) => {
                await Product.findByIdAndUpdate(item?.product, {
                    $inc: {
                        countInStock: +item?.amount,
                        sold: -item?.amount,
                    },
                });
            });
            await Order.findByIdAndDelete(orderId);
            return resolve({
                statusCode: 200,
                message: "Delete order successfully!",
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createOrder,
    getAnOrder,
    cancelOrder,
    paidOrder,
};
