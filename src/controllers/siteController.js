class siteController {
    // [GET] /
    index(req, res, next) {
        res.send("hello site");
    }

    // [POST] /log-out
    async logout(req, res, next) {
        try {
            res.clearCookie("refresh_token");

            res.status(200).json({
                status: "OK",
                message: "Logout successfully",
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    async decodedPayload(req, res, next) {
        return res.status(200).json({
            message: "Decoded payload successfully",
            data: req.body,
        });
    }
}

module.exports = new siteController();
