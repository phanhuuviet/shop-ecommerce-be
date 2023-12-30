const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: Number, default: 1 },
        phone: { type: String, required: true, default: "" },
        gender: { type: String, default: "Other" },
        address: { type: String, default: "" },
        dateOfBirth: { type: Date, default: new Date("2000-01-01T00:00:00Z") },
        avatar: { type: String, default: "" },
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

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
