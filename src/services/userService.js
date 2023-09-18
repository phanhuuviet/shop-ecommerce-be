const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Order = require("../models/OrderProductModel");

const getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find all user
            const users = await User.find({});
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
            const orders = await Order.find({ user: id });
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

const create = (userData) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone, gender } =
            userData;
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

module.exports = {
    getAll,
    getUser,
    getAllOrder,
    create,
    update,
    deleteUser,
    deleteMany,
};
