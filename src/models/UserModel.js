const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: Number, default: 1 },
        phone: { type: String, required: true },
        gender: { type: String },
        address: { type: String },
        dateOfBirth: { type: Date, default: new Date("2000-01-01T00:00:00Z") },
        avatar: { type: String },
        background: { type: String },
        totalProduct: { type: Number, default: 0 },
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
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
