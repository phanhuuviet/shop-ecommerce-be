const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        description: { type: String },
        sold: { type: Number, default: 0 },
    },
    {
        timestamps: true,
        collection: "Product",
    }
);

// Query helper
productSchema.query.sortable = function (sort) {
    if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        this.sort(objectSort);
    }
    return this;
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
