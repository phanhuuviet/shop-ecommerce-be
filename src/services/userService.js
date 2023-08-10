const User = require("../models/UserModel");

const createUser = (userData) => {
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

            // Create user
            const createUser = await User.create({
                name,
                email,
                password,
                confirmPassword,
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

module.exports = {
    createUser,
};
