const authService = require("../services/authService");

class authController {
    // [POST] /sign-in
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "The input is required",
                });
            } else if (
                !String(email)
                    .toLowerCase()
                    .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
            ) {
                return res.status(400).json({
                    statusCode: 400,
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

    async login_noSqlInjection(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await authService.login_noSqlInjection(
                email,
                password
            );
            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    async login_withPreventNoSqlInjection(req, res, next) {
        try {
            const { email, password } = req.body;

            if (
                !String(email)
                    .toLowerCase()
                    .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
            ) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "The username must be email!",
                });
            } else if (
                !String(password)
                    .toLowerCase()
                    .match(/^[a-zA-Z0-9!@#$%^&*()_+]{6,20}$/)
            ) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "The password must be at least 6 characters!",
                });
            }

            const result = await authService.login({
                email,
                password,
            });
            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }
}

module.exports = new authController();
