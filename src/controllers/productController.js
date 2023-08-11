const productService = require("../services/productService");

class productController {
    // [GET] /product
    async index(req, res, next) {
        try {
            const { limit, page } = req.query;
            const result = await productService.getAll(
                parseInt(limit),
                parseInt(page)
            );

            res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                message: "Khong tim thay trang",
            });
        }
    }

    // [POST] /product/create
    async createProduct(req, res, next) {
        try {
            const {
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description,
            } = req.body;
            // const reg = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
            // const isCheckEmail = reg.test(email);
            if (
                !name ||
                !image ||
                !type ||
                !price ||
                !countInStock ||
                !rating
            ) {
                return res
                    .status(200)
                    .json({ status: "err", message: "The input is required" });
            }
            const result = await productService.create(req.body);
            res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                message: "Khong tim thay trang",
            });
        }
    }

    // [PUT] /product/:id
    async updateProduct(req, res, next) {
        try {
            const productId = req.params.id;
            const data = req.body;
            if (!productId) {
                return res.status(200).json({
                    status: "OK",
                    message: "Product id is required",
                });
            }
            const result = await productService.update(productId, data);

            res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                message: "Khong tim thay trang",
            });
        }
    }

    // [GET] /product/:id
    async getAnProduct(req, res, next) {
        try {
            const productId = req.params.id;
            if (!productId) {
                return res.status(200).json({
                    status: "OK",
                    message: "Product id is required",
                });
            }
            const result = await productService.getAnProduct(productId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                message: "Khong tim thay trang",
            });
        }
    }

    // [DELETE] /product/:id
    async deleteProduct(req, res, next) {
        try {
            const productId = req.params.id;
            if (!productId) {
                return res.status(200).json({
                    status: "OK",
                    message: "Product id is required",
                });
            }
            const result = await productService.deleteProduct(productId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                message: "Khong tim thay trang",
            });
        }
    }
}

module.exports = new productController();
