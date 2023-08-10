const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

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
                    status: "OK",
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
            // Find user
            const checkUser = await User.findById(id);
            if (!checkUser) {
                resolve({
                    status: "OK",
                    message: "User is not exist",
                });
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, {
                new: true,
            });
            resolve({
                status: "OK",
                message: "SUCCESS",
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    create,
    update,
};
