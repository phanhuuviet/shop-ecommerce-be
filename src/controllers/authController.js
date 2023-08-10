const authService = require("../services/authService");

class authController {
    // [POST] /sign-in
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const reg = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
            const isCheckEmail = reg.test(email);
            if (!email || !password) {
                return res
                    .status(200)
                    .json({ status: "err", message: "The input is required" });
            } else if (!isCheckEmail) {
                return res
                    .status(200)
                    .json({ status: "err", message: "The input is email" });
            }
            const result = await authService.login(req.body);
            res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                message: "Khong tim thay trang",
            });
        }
    }
}

module.exports = new authController();
