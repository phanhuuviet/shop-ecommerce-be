const userService = require("../services/UserService");
const jwtService = require("../services/jwtService");

class userController {
    // [GET] /user
    async index(req, res, next) {
        try {
            const result = await userService.getAll();

            res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                message: "Khong tim thay trang",
            });
        }
    }

    // [GET] /user/:id
    async getAnUser(req, res, next) {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(200).json({
                    status: "OK",
                    message: "User id is required",
                });
            }
            const result = await userService.getUser(userId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                message: "Khong tim thay trang",
            });
        }
    }

    // [GET] /user/refresh-token
    async refreshToken(req, res, next) {
        try {
            const token = req.headers.token.split(" ")[1];
            if (!token) {
                return res.status(200).json({
                    status: "OK",
                    message: "User token is required",
                });
            }
            const result = await jwtService.refreshToken(token);

            res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                message: "Khong tim thay trang",
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
                    .json({ status: "err", message: "The password is equal" });
            }
            const result = await userService.create(req.body);
            res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                message: "Khong tim thay trang",
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
            return res.status(404).json({
                message: "Khong tim thay trang",
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
            return res.status(404).json({
                message: "Khong tim thay trang",
            });
        }
    }
}

module.exports = new userController();
