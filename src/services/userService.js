const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find all user
            const users = await User.find({});
            resolve({
                status: "OK",
                message: "SUCCESS",
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

const create = (userData) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = userData;
        try {
            // Check exist user in database
            const checkUser = await User.findOne({
                email,
            });
            if (checkUser) {
                resolve({
                    status: "err",
                    message: "The email is already",
                });
            }
            const hash = bcrypt.hashSync(password, 1);

            // Create user
            const createUser = await User.create({
                name,
                email,
                password: hash,
                phone,
            });
            resolve({
                status: "OK",
                message: "SUCCESS",
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
                message: "SUCCESS",
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
                message: "DELETE USER SUCCESS",
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    getAll,
    getUser,
    create,
    update,
    deleteUser,
};
