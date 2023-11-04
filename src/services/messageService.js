const Message = require("../models/MessageModel");

const addMessage = ({ chatId, senderId, text }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const message = await Message.create({
                chatId,
                senderId,
                text,
            });
            resolve({
                status: "OK",
                message: "successfully",
                data: message,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const getMessages = ({ chatId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const message = await Message.find({
                chatId,
            });
            resolve({
                status: "OK",
                message: "successfully",
                data: message,
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = { addMessage, getMessages };
