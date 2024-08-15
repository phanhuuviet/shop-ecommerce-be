const chatService = require("../services/chatService");

class chatController {
    async createChat(req, res, next) {
        try {
            const senderId = req.body.senderId;
            const receiverId = req.body.receiverId;
            if (!senderId || !receiverId) {
                return res.status(400).json({
                    message: "SenderId and receiverId is required",
                });
            } else {
                const response = await chatService.createChat({
                    senderId,
                    receiverId,
                });
                return res.status(200).json(response);
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    async userChats(req, res, next) {
        try {
            const userId = req.params.userId;
            if (!userId) {
                return res.status(400).json({
                    message: "UserId is required",
                });
            } else {
                const response = await chatService.userChats({
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

    async findChat(req, res, next) {
        try {
            const firstId = req.params.firstId;
            const secondId = req.params.secondId;
            if (!firstId || !secondId) {
                return res.status(400).json({
                    status: "err",
                    message: "FirstId and SecondId is required",
                });
            } else {
                const response = await chatService.findChat({
                    firstId,
                    secondId,
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

module.exports = new chatController();
