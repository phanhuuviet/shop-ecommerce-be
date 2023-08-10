const userService = require("../services/UserService");

class userController {
    index(req, res, next) {
        res.send("hello");
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
            const result = await userService.createUser(req.body);
            res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                message: "Khong tim thay trang",
            });
        }
    }
}

module.exports = new userController();
