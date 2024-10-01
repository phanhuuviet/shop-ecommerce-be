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
                    statusCode: 400,
                    message: "The user is not exist",
                });
            }

            // Check password vs password in DB
            const comparePassword = bcrypt.compareSync(
                password,
                checkUser.password
            );

            if (!comparePassword) {
                resolve({
                    statusCode: 400,
                    message: "Email or password is incorrect",
                });
            }

            // generate access token vs refresh token
            const access_token = generalAccessToken({
                id: checkUser._id,
                role: checkUser.role,
            });

            const refresh_token = generalRefreshToken({
                id: checkUser._id,
                role: checkUser.role,
            });

            // return json
            resolve({
                statusCode: 200,
                message: "successfully",
                access_token,
                refresh_tokens: refresh_token,
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    login,
};
