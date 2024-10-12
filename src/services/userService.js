const User = require("../models/UserModel");
const Order = require("../models/OrderProductModel");
const Product = require("../models/ProductModel");
const Cart = require("../models/CartModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find all user
            const users = await User.find({
                name: { $regex: new RegExp(keyword, "i") },
            });
            resolve({
                status: "OK",
                message: "success",
                data: users,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const getUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const checkUser = await User.findById(id);
            if (!checkUser) {
                resolve({
                    status: "err",
                    message: "User is not exist",
                });
            }
            // Find an user
            const user = await User.findOne({ _id: id });
            resolve({
                status: "OK",
                message: "FIND USER SUCCESS",
                data: user,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const getShop = ({ shopId, userId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find shop and check shop exist
            const [shop, products] = await Promise.all([
                User.findById(shopId),
                Product.find({ user: shopId }),
            ]);
            if (!shop) {
                resolve({
                    status: "err",
                    message: "Shop is not exist",
                });
                return;
            }
            const isFollowing = shop.followers.includes(userId);
            resolve({
                status: "OK",
                message: "FIND SHOP SUCCESS",
                data: {
                    ...shop.toObject(), // Convert Mongoose document to plain object
                    isFollowing,
                    products: products,
                },
            });
        } catch (err) {
            reject(err);
        }
    });
};

const getMe = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const checkUser = await User.findById(id);
            if (!checkUser) {
                resolve({
                    statusC: "err",
                    statusCode: 404,
                    message: "User is not exist",
                });
            }

            resolve({
                status: "OK",
                statusCode: 200,
                message: "FIND USER SUCCESS",
                data: checkUser,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const getCart = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const carts = await Cart.find({ userId: id });

            resolve({
                status: "OK",
                message: "FIND CART SUCCESS",
                data: carts,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const getAllOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const checkUser = await User.findById(id);
            if (!checkUser) {
                resolve({
                    status: "err",
                    message: "User is not exist",
                });
            }
            // Find an user
            const orders = (await Order.find({ user: id })).reverse();
            resolve({
                status: "OK",
                message: "FIND ORDER SUCCESS",
                data: orders,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const getProduct = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const checkUser = await User.findById(userId);
            if (!checkUser) {
                resolve({
                    status: "err",
                    message: "User is not exist",
                });
            }
            // Find all product of an user
            const products = await Product.find({ user: userId }).populate(
                "user"
            );
            resolve({
                status: "OK",
                message: "FIND PRODUCT SUCCESS",
                data: products,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const getFollowingShop = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const checkUser = await User.findById(userId).populate("following");
            if (!checkUser) {
                resolve({
                    status: "err",
                    message: "User is not exist",
                });
            }
            resolve({
                status: "OK",
                message: "FIND FOLLOWING SHOP SUCCESS",
                data: checkUser.following,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const create = (userData) => {
    return new Promise(async (resolve, reject) => {
        const {
            name,
            email,
            password,
            confirmPassword,
            phone,
            gender,
            address,
        } = userData;
        try {
            // Check exist user in database
            const checkUser = await User.findOne({
                email,
            });
            if (checkUser) {
                resolve({
                    status: "err",
                    message: "Email already exists",
                });
            }
            const hash = bcrypt.hashSync(password, 1);

            // Create user
            const createUser = await User.create({
                name,
                email,
                password: hash,
                phone,
                gender,
                address,
            });
            resolve({
                status: "OK",
                message: "successfully",
                data: createUser,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const followShop = ({ userId, shopId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const checkShop = await User.findById(shopId);
            if (!checkShop) {
                resolve({
                    status: "err",
                    message: "Shop is not exist",
                });
            }

            // Find and update
            await Promise.all([
                User.findByIdAndUpdate(userId, {
                    $addToSet: { following: shopId },
                }),
                User.findByIdAndUpdate(shopId, {
                    $addToSet: { followers: userId },
                }),
            ]);
            resolve({
                status: "OK",
                message: "Following successfully",
            });
        } catch (err) {
            reject(err);
        }
    });
};

const unFollowShop = ({ userId, shopId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const checkShop = await User.findById(shopId);
            if (!checkShop) {
                resolve({
                    status: "err",
                    message: "Shop is not exist",
                });
            }

            // Find and update
            await Promise.all([
                User.findByIdAndUpdate(userId, {
                    $pull: { following: shopId },
                }),
                User.findByIdAndUpdate(shopId, {
                    $pull: { followers: userId },
                }),
            ]);
            resolve({
                status: "OK",
                message: "Unfollow successfully",
            });
        } catch (err) {
            reject(err);
        }
    });
};

const update = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const checkUser = await User.findById(id);
            if (!checkUser) {
                resolve({
                    status: "err",
                    message: "User is not exist",
                });
            }

            // Find and update
            const updatedUser = await User.findByIdAndUpdate(id, data, {
                new: true,
            });
            resolve({
                status: "OK",
                message: "successfully",
                data: updatedUser,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const changePasswordUser = (id, currentPassword, newPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const checkUser = await User.findById(id);
            if (!checkUser) {
                return resolve({
                    status: 400,
                    message: "User is not exist",
                });
            }
            // Compare password of user vs current password
            const isCurrentPasswordValid = await bcrypt.compare(
                currentPassword,
                checkUser.password
            );
            if (!isCurrentPasswordValid) {
                return resolve({
                    status: 401,
                    message: "Current password is incorrect!",
                });
            }
            // Encode new password
            const newEncryptedPassword = await bcrypt.hash(newPassword, 10);

            // Find and update
            const updatedUser = await User.findByIdAndUpdate(
                id,
                {
                    $set: { password: newEncryptedPassword },
                },
                {
                    new: true,
                }
            );
            resolve({
                status: "OK",
                message: "successfully",
                data: updatedUser,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const addToCart = (cartData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const checkCart = await Cart.find({
                userId: cartData.userId,
                productId: cartData.productId,
            });
            let res;
            if (checkCart.length === 0) {
                res = await Cart.create(cartData);
            } else {
                res = await Cart.findOneAndUpdate(
                    {
                        userId: cartData.userId,
                        productId: cartData.productId,
                    },
                    {
                        $inc: {
                            amount: cartData.amount,
                        },
                    },
                    {
                        new: true,
                    }
                );
            }
            resolve({
                message: "Add to cart success!",
                data: res,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const increaseAmountProductInCart = ({ cartId, amount }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find cart and check cart exist
            const checkCart = await Cart.findById(cartId);
            if (!checkCart) {
                resolve({
                    status: "err",
                    message: "Cart is not exist",
                });
            }

            const result = await Cart.findByIdAndUpdate(
                cartId,
                {
                    amount: amount,
                },
                {
                    new: true,
                }
            );
            resolve({
                status: "OK",
                message: "Update cart success",
                data: result,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const checkUser = await User.findById(id);
            if (!checkUser) {
                resolve({
                    status: "err",
                    message: "User is not exist",
                });
            }

            // Find and delete
            await User.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Delete user success",
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
            await User.deleteMany({ _id: ids });
            resolve({
                status: "OK",
                message: "Delete user success",
            });
        } catch (err) {
            reject(err);
        }
    });
};

const deleteCart = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find cart and check user exist
            const checkCart = await Cart.findById(id);
            if (!checkCart) {
                resolve({
                    status: "err",
                    message: "Cart is not exist",
                });
            }

            // Find and delete
            await Cart.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Delete cart success",
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    getAll,
    getUser,
    getAllOrder,
    getProduct,
    getMe,
    getShop,
    getCart,
    getFollowingShop,
    create,
    followShop,
    unFollowShop,
    addToCart,
    update,
    changePasswordUser,
    increaseAmountProductInCart,
    deleteUser,
    deleteMany,
    deleteCart,
};
