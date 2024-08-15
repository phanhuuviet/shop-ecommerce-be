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
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /product/get-all-type
    async getAllType(req, res, next) {
        try {
            const allType = await productService.getAllType();

            res.status(200).json(allType);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /product/top
    async getTopProduct(req, res, next) {
        try {
            const topProduct = await productService.getTopProduct();

            res.status(200).json(topProduct);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [POST] /product/:id/feedback
    async rateProduct(req, res, next) {
        try {
            // get product id
            const { id } = req.params;

            // get user id
            const userId = req.userId;

            // get infomation
            const { rating, message, orderId } = req.body;
            if (!orderId || !userId || !message || !id) {
                return res.status(400).json({
                    message: "Missing required field!",
                });
            }
            const result = await productService.rateProduct({
                orderId,
                rating: +rating,
                userId,
                message,
                id,
            });

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [POST] /product/create
    async createProduct(req, res, next) {
        try {
            const { name, image, type, price, countInStock, rating } = req.body;
            const userId = req?.userId;
            if (
                !name ||
                !image ||
                !type ||
                !price ||
                !countInStock ||
                !rating ||
                !userId
            ) {
                return res.status(400).json({
                    message: "You need to fill all field required",
                });
            }
            const result = await productService.create({ ...req.body, userId });
            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [PUT] /product/:id
    async updateProduct(req, res, next) {
        try {
            const productId = req.params.id;
            const data = req.body;
            if (!productId) {
                return res.status(400).json({
                    message: "Product id is required",
                });
            }
            const result = await productService.update(productId, data);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /product/:id
    async getAnProduct(req, res, next) {
        try {
            const productId = req.params.id;
            if (!productId) {
                return res.status(400).json({
                    message: "Product id is required",
                });
            }
            const result = await productService.getAnProduct(productId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [DELETE] /product/:id
    async deleteProduct(req, res, next) {
        try {
            const productId = req.params.id;
            if (!productId) {
                return res.status(400).json({
                    message: "Product id is required",
                });
            }
            const result = await productService.deleteProduct(productId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [DELETE] /product/delete-many
    async deleteManyProduct(req, res, next) {
        try {
            const ids = req.body._id;
            if (!ids) {
                return res.status(400).json({
                    message: "Product ids is required",
                });
            }
            const result = await productService.deleteMany(ids);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }
    async favoriteProduct(req, res, next) {
        try {
            const id = req.params.id; // id product
            const { userId } = req;

            if (!id) {
                return res.status(400).json({
                    message: "Product id is required",
                });
            }
            const result = await productService.favoriteProduct({ id, userId });

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    async unFavoriteProduct(req, res, next) {
        try {
            const id = req.params.id;
            const { userId } = req;

            if (!id) {
                return res.status(400).json({
                    message: "Product id is required",
                });
            }
            const result = await productService.unFavoriteProduct({
                id,
                userId,
            });

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }
}

module.exports = new productController();
