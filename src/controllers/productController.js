const productService = require("../services/productService");

class productController {
    // [GET] /product
    async index(req, res, next) {
        try {
            const { limit, page, sort, filter } = req.query;
            const result = await productService.getAll(
                parseInt(limit) || 8,
                parseInt(page) || 0,
                sort,
                filter
            );

            res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                message: "Page not found",
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
                message: "Page not found",
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
                message: "Page not found",
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
                message: "Page not found",
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
                message: "Page not found",
            });
        }
    }

    // [DELETE] /product/delete-many
    async deleteManyProduct(req, res, next) {
        try {
            const ids = req.body._id;
            if (!ids) {
                return res.status(200).json({
                    status: "err",
                    message: "Product ids is required",
                });
            }
            const result = await productService.deleteMany(ids);

            res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                message: "Page not found",
            });
        }
    }
}

module.exports = new productController();
