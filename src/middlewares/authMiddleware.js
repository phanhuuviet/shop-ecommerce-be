const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { ROLE_ADMIN, ROLE_SELLER } = require("../constants/role");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers?.authorization.split(" ")[1];
        const data = jwt.verify(token, process.env.ACCESS_TOKEN);
        if (data?.role === ROLE_ADMIN) {
            next();
        } else {
            return res.status(401).json({
                message: "Authentication fail",
                status: "ERROR",
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: "Authentication fail",
            status: "ERROR",
        });
    }
};

const authUserMiddleware = (req, res, next) => {
    try {
        const token = req.headers?.authorization.split(" ")[1];
        const idUser = req.headers?.userid || req.params.id;

        const data = jwt.verify(token, process.env.ACCESS_TOKEN);

        if (data.role === ROLE_ADMIN || data.id === idUser) {
            next();
        } else {
            return res.status(401).json({
                message: "Authentication fail",
                status: "ERROR",
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: "Authentication fail",
            status: "ERROR",
        });
    }
};

const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Missing token!" });
        }
        const data = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.userId = data?.id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authentication fail",
            status: "ERROR",
        });
    }
};

const checkIsAdminOrIsSeller = (req, res, next) => {
    try {
        const token = req.headers?.authorization.split(" ")[1];
        const data = jwt.verify(token, process.env.ACCESS_TOKEN);
        if (data?.role === ROLE_ADMIN || data?.role === ROLE_SELLER) {
            req.userId = data?.id;
            next();
        } else {
            return res.status(401).json({
                message: "Authentication fail",
                status: "ERROR",
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: "Authentication fail",
            status: "ERROR",
        });
    }
};

const authenticateTokenIfHas = (req, res, next) => {
    try {
        const token = req.headers?.authorization;
        if (token) {
            token = token.split(" ")[1];
            const data = jwt.verify(token, process.env.ACCESS_TOKEN);
            req.userId = data?.id;
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authentication fail",
            status: "ERROR",
        });
    }
};

module.exports = {
    authMiddleware,
    authUserMiddleware,
    authenticateToken,
    checkIsAdminOrIsSeller,
    authenticateTokenIfHas,
};
