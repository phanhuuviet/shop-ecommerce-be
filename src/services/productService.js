const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const Order = require("../models/OrderProductModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const calculateRating = require("../utils/calculateRating");
const Feedback = require("../models/FeedbackModel");

const getAll = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        // check if filter exist then finding
        const products = Product.find({
            ...(filter && { [filter[0]]: { $regex: filter[1] } }),
        });
        const totalProduct = await products.clone().count();
        if (limit) {
            products.limit(limit).skip(page * limit);
        }
        if (sort) {
            products.sortable(sort);
        }

        products
            .populate("user")
            .then((product) => {
                resolve({
                    status: "OK",
                    message: "successfully",
                    data: product,
                    total: totalProduct,
                    currentPage: page + 1,
                    totalPage: Math.ceil(totalProduct / limit),
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        const products = Product.distinct("type");
        products
            .then((types) => {
                resolve({
                    status: "OK",
                    message: "successfully",
                    data: types,
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const getTopProduct = () => {
    return new Promise(async (resolve, reject) => {
        const products = Product.find().sort({ sold: "desc" }).limit(12);
        products
            .then((types) => {
                resolve({
                    status: "OK",
                    message: "successfully",
                    data: types,
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const rateProduct = ({ id, rating, userId, message, orderId }) => {
    return new Promise(async (resolve, reject) => {
        const product = await Product.findById(id);
        if (!product) {
            return resolve({
                status: "err",
                message: "Product is not exist",
            });
        }
        const newRating = calculateRating({
            rating: rating,
            oldRating: product?.rating,
            reviewCount: product?.reviewCount,
        });
        const [_, productResult, orderResult] = await Promise.all([
            Feedback.create({
                product: id,
                rating,
                user: userId,
                message,
            }),
            Product.findByIdAndUpdate(
                id,
                {
                    rating: newRating.toFixed(2),
                    $inc: {
                        reviewCount: 1,
                    },
                },
                { new: true }
            ),
            Order.findOneAndUpdate(
                {
                    _id: orderId,
                    "orderItems.product": id,
                },
                {
                    $set: {
                        "orderItems.$.isRating": true,
                    },
                },
                { new: true }
            ),
        ]);
        resolve({
            status: "OK",
            message: "successfully",
            data: productResult,
        });
    });
};

const create = (data) => {
    return new Promise(async (resolve, reject) => {
        const {
            name,
            image,
            type,
            price,
            countInStock,
            rating,
            description,
            userId,
        } = data;
        try {
            // Check exist product in database
            const checkProduct = await Product.findOne({
                name,
            });
            if (checkProduct) {
                resolve({
                    status: "err",
                    message: "Product already exists",
                });
            }
            // Create product
            const [createProduct, _] = await Promise.all([
                Product.create({
                    name,
                    image,
                    type,
                    price,
                    countInStock: Number(countInStock),
                    rating,
                    description,
                    user: userId,
                }),
                User.findByIdAndUpdate(
                    userId,
                    {
                        $inc: { totalProduct: 1 },
                    },
                    { new: true }
                ),
            ]);
            resolve({
                status: "OK",
                message: "successfully",
                data: createProduct,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const update = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find product and check product exist
            const checkProduct = await Product.findById(id);
            if (!checkProduct) {
                resolve({
                    status: "OK",
                    message: "Product is not exist",
                });
            }

            // Find and update
            const updatedProduct = await Product.findByIdAndUpdate(id, data, {
                new: true,
            });
            resolve({
                status: "OK",
                message: "successfully",
                data: updatedProduct,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const getAnProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find product and check product exist
            const checkProduct = await Product.findById(id);
            if (!checkProduct) {
                return resolve({
                    status: "OK",
                    message: "Product is not exist",
                });
            }
            // Find an product
            const [product, feedback] = await Promise.all([
                await Product.findOne({ _id: id }).populate("user"),
                await Feedback.find({ product: id }).populate("user"),
            ]);
            const result = {
                ...product.toObject(),
                feedback: feedback.map((feedbackData) =>
                    feedbackData.toObject()
                ),
            };
            resolve({
                status: "OK",
                message: "Find product success",
                data: result,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const checkProduct = await Product.findById(id);
            if (!checkProduct) {
                resolve({
                    status: "OK",
                    message: "Product is not exist",
                });
            }

            // Find and delete
            await Product.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Delete pruduct success",
            });
        } catch (err) {
            reject(err);
        }
    });
};

const favoriteProduct = ({ id, userId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find product and check product exist
            const checkProduct = await Product.findById(id);
            if (!checkProduct) {
                resolve({
                    status: "err",
                    message: "Product is not exist",
                });
                return;
            }
            const checkUser = await User.findById(userId);
            if (!checkUser) {
                resolve({
                    status: "err",
                    message: "User is not exist",
                });
                return;
            }
            // Find and update
            const result = await Product.findByIdAndUpdate(
                {
                    _id: id,
                },
                {
                    $inc: {
                        favorites: 1,
                    },
                },
                {
                    new: true,
                }
            );
            if (checkUser.favoriteProduct.includes(id)) {
                resolve({
                    status: "err",
                    message: "Product is already exist in favorite list!",
                });
                return;
            } else {
                checkUser.favoriteProduct.push(id);
                await checkUser.save();
            }
            resolve({
                status: "OK",
                message: "Favorite product success",
                data: result,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const unFavoriteProduct = ({ id, userId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find product and check product exist
            const checkProduct = await Product.findById(id);
            if (!checkProduct) {
                resolve({
                    status: "err",
                    message: "Product is not exist",
                });
            }

            const checkUser = await User.findById(userId);
            if (!checkUser) {
                resolve({
                    status: "err",
                    message: "User is not exist",
                });
            }

            // Find and update
            const result = await Product.findOneAndUpdate(
                {
                    _id: id,
                },
                {
                    $inc: {
                        favorites: -1,
                    },
                },
                {
                    new: true,
                }
            );
            if (checkUser.favoriteProduct.includes(id)) {
                const index = checkUser.favoriteProduct.indexOf(id);
                checkUser.favoriteProduct.splice(index);
                await checkUser.save();
            } else {
                resolve({
                    status: "err",
                    message: "Product is not exist in favorite list!",
                });
            }
            resolve({
                status: "OK",
                message: "Un favorite product success",
                data: result,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const deleteMany = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find and delete
            await Product.deleteMany({ _id: ids });
            resolve({
                status: "OK",
                message: "Delete product success",
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    getAll,
    getAnProduct,
    getAllType,
    getTopProduct,
    create,
    rateProduct,
    update,
    deleteProduct,
    deleteMany,
    favoriteProduct,
    unFavoriteProduct,
};
