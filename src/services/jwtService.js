const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generalAccessToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: "30d",
    });

    return accessToken;
};

const generalRefreshToken = (payload) => {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
        expiresIn: "30d",
    });

    return refreshToken;
};

const refreshToken = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, function (err, data) {
                if (err) {
                    resolve({
                        status: "err",
                        message: "Authentication fail",
                    });
                }
                const access_token = generalAccessToken({
                    id: data?.id,
                    role: data?.role,
                });
                resolve({
                    status: "OK",
                    message: "REFRESH TOKEN SUCCESS",
                    access_token,
                });
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshToken,
};
