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
                    .json({ status: "err", message: "This field is email" });
            }
            const result = await authService.login(req.body);
            const { refresh_token, ...newResponse } = result;

            res.cookie("refresh_token", refresh_token, {
                HttpOnly: true,
                Secure: false,
                samesite: "strict",
                path: "/",
            });
            res.status(200).json(newResponse);
        } catch (error) {
            return res.status(404).json({
                message: "Page not found",
            });
        }
    }
}

module.exports = new authController();
