const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        productId: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: "Cart",
    }
);
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
