const requestService = require("../services/requestService");

class requestController {
    // [GET] /request/seller
    async getAllRequestSeller(req, res, next) {
        try {
            const response = await requestService.getAllRequestSeller();
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /request/error
    async getAllRequestError(req, res, next) {
        try {
            const response = await requestService.getAllRequestError();
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [POST] /request/seller
    async requestPermissionToSeller(req, res, next) {
        try {
            const { userId } = req;
            if (!userId) {
                return res.status(401).json({
                    message: "User id is required",
                });
            } else {
                const response = await requestService.requestPermissionToSeller(
                    { userId }
                );
                return res.status(200).json(response);
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [POST] /request/seller
    async reportError(req, res, next) {
        try {
            const { userId } = req;
            const { description } = req.body;
            if (!userId) {
                return res.status(401).json({
                    message: "User id is required",
                });
            } else {
                const response = await requestService.reportError({
                    userId,
                    description,
                });
                return res.status(200).json(response);
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [PUT] /request/:id/seller/accept
    async acceptToSeller(req, res, next) {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            if (!id) {
                return res.status(401).json({
                    message: "Request id is required",
                });
            } else {
                const response = await requestService.acceptToSeller({
                    id,
                    userId,
                });
                return res.status(200).json(response);
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [PUT] /request/:id/seller/reject
    async rejectToSeller(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(401).json({
                    message: "Request id is required",
                });
            } else {
                const response = await requestService.rejectToSeller({
                    id,
                });
                return res.status(200).json(response);
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }
}

module.exports = new requestController();
