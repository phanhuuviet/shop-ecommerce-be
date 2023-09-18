const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers?.token.split(" ")[1];
        const data = jwt.verify(token, process.env.ACCESS_TOKEN);
        if (data?.isAdmin) {
            next();
        } else {
            return res.status(404).json({
                message: "Authentication fail",
                status: "ERROR",
            });
        }
    } catch (error) {
        return res.status(404).json({
            message: "Authentication fail",
            status: "ERROR",
        });
    }
};

const authUserMiddleware = (req, res, next) => {
    try {
        const token = req.headers?.token.split(" ")[1];
        const idUser = req.headers?.userid || req.params.id;

        const data = jwt.verify(token, process.env.ACCESS_TOKEN);

        if (data.isAdmin || data.id === idUser) {
            next();
        } else {
            return res.status(404).json({
                message: "Authentication fail",
                status: "ERROR",
            });
        }
    } catch (error) {
        return res.status(404).json({
            message: "Authentication fail",
            status: "ERROR",
        });
    }
};

module.exports = {
    authMiddleware,
    authUserMiddleware,
};
