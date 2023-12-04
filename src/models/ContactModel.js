const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        toSeller: { type: Boolean, default: false },
        toError: { type: Boolean, default: false },
        description: { type: String },
        status: { type: String, default: "Pending" },
    },
    {
        timestamps: true,
    }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
