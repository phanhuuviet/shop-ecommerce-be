const messageService = require("../services/messageService");

class messageController {
    async addMessage(req, res, next) {
        try {
            const { chatId, senderId, text } = req.body;
            if (!chatId || !senderId || !text) {
                return res.status(400).json({
                    status: "err",
                    message: "ChatId and senderId and text is required",
                });
            } else {
                const response = await messageService.addMessage({
                    chatId,
                    senderId,
                    text,
                });
                return res.status(200).json(response);
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    async getMessages(req, res, next) {
        try {
            const { chatId } = req.params;
            if (!chatId) {
                return res.status(400).json({
                    status: "err",
                    message: "ChatId is required",
                });
            } else {
                const response = await messageService.getMessages({
                    chatId,
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

module.exports = new messageController();
