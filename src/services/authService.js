const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./jwtService");

const login = (userData) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userData;
        try {
            // Check exist user in database
            const checkUser = await User.findOne({
                email,
            });
            if (!checkUser) {
                resolve({
                    status: "OK",
                    message: "The user is not exist",
                });
            }
            const comparePassword = bcrypt.compareSync(
                password,
                checkUser.password
            );
            if (!comparePassword) {
                resolve({
                    status: "OK",
                    message: "Email or password is incorrect",
                });
            }
            const access_token = generalAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin,
            });

            const refresh_token = generalRefreshToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin,
            });
            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token,
                refresh_token,
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    login,
};
