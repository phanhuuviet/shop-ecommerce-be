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
            return res.status(404).json({
                message: "Page not found",
            });
        }
    }
}

module.exports = new siteController();
