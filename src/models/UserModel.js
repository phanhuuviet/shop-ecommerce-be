const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: String, required: true },
        gender: { type: String },
        address: { type: String },
        avatar: { type: String },
        favoriteProduct: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    {
        timestamps: true,
        collection: "User",
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
