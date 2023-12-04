const Request = require("../models/ContactModel");

const getAllRequestSeller = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allRequest = await Request.find({
                toSeller: true,
            }).populate("userId");
            resolve({
                status: "OK",
                message: "successfully",
                data: allRequest,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const getAllRequestError = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allRequest = await Request.find({
                toError: true,
            }).populate("userId");
            resolve({
                status: "OK",
                message: "successfully",
                data: allRequest,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const requestPermissionToSeller = ({ userId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newRequest = await Request.create({
                userId,
                toSeller: true,
            });
            resolve({
                status: "OK",
                message: "successfully",
                data: newRequest,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const reportError = ({ userId, description }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newRequest = await Request.create({
                userId,
                description,
                toError: true,
            });
            resolve({
                status: "OK",
                message: "successfully",
                data: newRequest,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const acceptToSeller = ({ id }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await Request.findByIdAndUpdate(
                id,
                {
                    status: "Approved",
                },
                { new: true }
            ).populate("userId");

            resolve({
                status: "OK",
                message: "successfully",
                data: request,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const rejectToSeller = ({ id }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await Request.findByIdAndUpdate(
                id,
                {
                    status: "Rejected",
                },
                { new: true }
            ).populate("userId");

            resolve({
                status: "OK",
                message: "successfully",
                data: request,
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    requestPermissionToSeller,
    getAllRequestError,
    reportError,
    getAllRequestSeller,
    acceptToSeller,
    rejectToSeller,
};
