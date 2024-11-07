const Chat = require("../models/ChatModel");
const Message = require("../models/MessageModel");

const createChat = ({ senderId, receiverId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkChat = await Chat.findOne({
                members: { $all: [senderId, receiverId] },
            });

            if (checkChat) {
                resolve({
                    status: "OK",
                    message: "successfully",
                    data: checkChat,
                });
                return;
            }
            const newChat = await Chat.create({
                members: [senderId, receiverId],
                friendId: senderId,
            });
            resolve({
                status: "OK",
                message: "create successfully",
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

            const chatsWithLastMessage = await Promise.all(
                chat?.map(async (chatItem) => {
                    const lastMessage = await Message.findOne({
                        chatId: chatItem._id,
                    })
                        .sort({ createdAt: -1 })
                        .lean();

                    return {
                        ...chatItem.toObject(),
                        lastMessage,
                    };
                })
            );

            resolve({
                status: "OK",
                message: "successfully",
                data: chatsWithLastMessage,
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

const getMessages = ({ chatId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const messages = await Message.find({
                chatId,
            });
            console.log("messages", messages);

            const formattedMessages = messages.map((message) => {
                return {
                    isUser: !message.senderId?.toString().includes("bot2vn"),
                    content: message.text,
                    createdAt: message.createdAt,
                };
            });
            resolve({
                statusCode: 200,
                message: "successfully",
                data: formattedMessages,
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
    getMessages,
};
