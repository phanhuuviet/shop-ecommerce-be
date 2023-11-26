const userService = require("../services/userService");
const jwtService = require("../services/jwtService");

class userController {
    // [GET] /user
    async index(req, res, next) {
        try {
            const { name } = req?.query;
            const result = await userService.getAll(name);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /user/order
    async getAllOrder(req, res, next) {
        try {
            const userId = req.headers?.userid;
            if (!userId) {
                return res.status(400).json({
                    status: "OK",
                    message: "User id is required",
                });
            }
            const result = await userService.getAllOrder(userId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /user/me
    async getMe(req, res, next) {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({
                    message: "User id is required",
                });
            }
            const result = await userService.getMe(userId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /user/:id
    async getAnUser(req, res, next) {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(400).json({
                    status: "OK",
                    message: "User id is required",
                });
            }
            const result = await userService.getUser(userId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [POST] /user/refresh-token
    async refreshToken(req, res, next) {
        try {
            const token = req.cookies.refresh_token;
            if (!token) {
                return res.status(400).json({
                    status: "OK",
                    message: "User token is required",
                });
            }
            const result = await jwtService.refreshToken(token);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /user/product
    async getProduct(req, res, next) {
        try {
            const userId = req?.userId;
            if (!userId) {
                return res.status(400).json({
                    message: "User id is required",
                });
            }

            const result = await userService.getProduct(userId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [POST] /user/cart
    async addToCart(req, res, next) {
        try {
            const userId = req?.userId;
            if (!userId) {
                return res.status(400).json({
                    message: "User id is required",
                });
            }

            const result = await userService.addToCart(userId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [POST] /sign-up
    async createUser(req, res, next) {
        try {
            const { name, email, password, confirmPassword, phone } = req.body;
            const reg = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
            const isCheckEmail = reg.test(email);
            if (!name || !email || !password || !confirmPassword || !phone) {
                return res
                    .status(200)
                    .json({ status: "err", message: "The input is required" });
            } else if (!isCheckEmail) {
                return res
                    .status(200)
                    .json({ status: "err", message: "The input is email" });
            } else if (password !== confirmPassword) {
                return res
                    .status(200)
                    .json({ status: "err", message: "Password must be equal" });
            }
            const result = await userService.create(req.body);
            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [PUT] /user/:id
    async updateUser(req, res, next) {
        try {
            const userId = req.params.id;
            const data = req.body;
            if (!userId) {
                return res.status(200).json({
                    status: "OK",
                    message: "User id is required",
                });
            }
            const result = await userService.update(userId, data);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [DELETE] /user/:id
    async deleteUser(req, res, next) {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(200).json({
                    status: "OK",
                    message: "User id is required",
                });
            }
            const result = await userService.deleteUser(userId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }
    // [DELETE] /user/delete-many
    async deleteMany(req, res, next) {
        try {
            const userIds = req.body._id;
            if (!userIds) {
                return res.status(200).json({
                    status: "OK",
                    message: "User ids is required",
                });
            }
            const result = await userService.deleteMany(userIds);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }
}

module.exports = new userController();
