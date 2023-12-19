const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        message: { type: String, required: true },
        rating: { type: Number, required: true },
    },
    {
        timestamps: true,
        collection: "Feedback",
    }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
