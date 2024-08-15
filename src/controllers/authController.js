const authService = require("../services/authService");

class authController {
    // [POST] /sign-in
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ message: "The input is required" });
            } else if (
                !String(email)
                    .toLowerCase()
                    .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
            ) {
                return res.status(400).json({
                    message: "The username must be email!",
                });
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
