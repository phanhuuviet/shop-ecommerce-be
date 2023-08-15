const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: Number, required: true },
        address: { type: String },
        avatar: { type: String },
    },
    {
        timestamps: true,
        collection: "User",
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
