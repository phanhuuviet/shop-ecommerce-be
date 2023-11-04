const Chat = require("../models/ChatModel");

const createChat = ({ senderId, receiverId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newChat = await Chat.create({
                members: [senderId, receiverId],
            });
            resolve({
                status: "OK",
                message: "successfully",
                data: newChat,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const userChats = ({ userId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const chat = await Chat.find({
                members: { $in: [userId] },
            });
            resolve({
                status: "OK",
                message: "successfully",
                data: chat,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const findChat = ({ firstId, secondId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const chat = await Chat.findOne({
                members: { $all: [firstId, secondId] },
            });
            resolve({
                status: "OK",
                message: "successfully",
                data: chat,
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    createChat,
    userChats,
    findChat,
};
