const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true },
                amount: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                isRating: {
                    type: Boolean,
                    default: false,
                },
                cartId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Cart",
                },
            },
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            phone: { type: Number, required: true },
        },
        paymentMethod: { type: String, required: true },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        taxPrice: { type: Number },
        totalPrice: { type: Number, required: true },
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
