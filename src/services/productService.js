const Product = require("../models/ProductModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        const totalProduct = await Product.count();
        // check if filter exist then finding
        const products = Product.find({
            ...(filter && { [filter[0]]: { $regex: filter[1] } }),
        })
            .limit(limit)
            .skip(page * limit);
        if (sort) {
            products.sortable(sort);
        }
        products
            .then((product) => {
                resolve({
                    status: "OK",
                    message: "successfully",
                    data: product,
                    total: totalProduct,
                    currentPage: page + 1,
                    totalPage: Math.ceil(totalProduct / limit),
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const create = (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } =
            data;
        try {
            // Check exist product in database
            const checkProduct = await Product.findOne({
                name,
            });
            if (checkProduct) {
                resolve({
                    status: "err",
                    message: "Product already exists",
                });
            }

            // Create user
            const createProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description,
            });
            resolve({
                status: "OK",
                message: "successfully",
                data: createProduct,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const update = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find product and check product exist
            const checkProduct = await Product.findById(id);
            if (!checkProduct) {
                resolve({
                    status: "OK",
                    message: "Product is not exist",
                });
            }

            // Find and update
            const updatedProduct = await Product.findByIdAndUpdate(id, data, {
                new: true,
            });
            resolve({
                status: "OK",
                message: "successfully",
                data: updatedProduct,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const getAnProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find product and check product exist
            const checkUser = await Product.findById(id);
            if (!checkUser) {
                resolve({
                    status: "OK",
                    message: "Product is not exist",
                });
            }
            // Find an product
            const product = await Product.findOne({ _id: id });
            resolve({
                status: "OK",
                message: "Find product success",
                data: product,
            });
        } catch (err) {
            reject(err);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find user and check user exist
            const checkProduct = await Product.findById(id);
            if (!checkProduct) {
                resolve({
                    status: "OK",
                    message: "Product is not exist",
                });
            }

            // Find and delete
            await Product.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Delete pruduct success",
            });
        } catch (err) {
            reject(err);
        }
    });
};

const deleteMany = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find and delete
            await Product.deleteMany({ _id: ids });
            resolve({
                status: "OK",
                message: "Delete product success",
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    getAll,
    getAnProduct,
    create,
    update,
    deleteProduct,
    deleteMany,
};
