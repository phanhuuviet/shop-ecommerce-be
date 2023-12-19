const userService = require("../services/userService");
const jwtService = require("../services/jwtService");
var mongoose = require("mongoose");

class userController {
    // [GET] /user
    async index(req, res, next) {
        try {
            const { name } = req?.query;
            const result = await userService.getAll(name);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /user/order
    async getAllOrder(req, res, next) {
        try {
            const userId = req.headers?.userid || req.userId;
            if (!userId) {
                return res.status(400).json({
                    status: "OK",
                    message: "User id is required",
                });
            }
            const result = await userService.getAllOrder(userId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /user/me
    async getMe(req, res, next) {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({
                    message: "User id is required",
                });
            }
            const result = await userService.getMe(userId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /user/cart
    async getCart(req, res, next) {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({
                    message: "User id is required",
                });
            }
            const result = await userService.getCart(userId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /user/:id
    async getAnUser(req, res, next) {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(400).json({
                    status: "OK",
                    message: "User id is required",
                });
            }
            const result = await userService.getUser(userId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /shop/:id
    async getShop(req, res, next) {
        try {
            const shopId = req.params.id;
            const { userId } = req;
            if (!shopId) {
                return res.status(400).json({
                    status: "OK",
                    message: "Shop id is required",
                });
            }
            const result = await userService.getShop({ shopId, userId });

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [POST] /user/refresh-token
    async refreshToken(req, res, next) {
        try {
            const token = req.body.refresh_token ?? req.cookies.refresh_token;
            if (!token) {
                return res.status(400).json({
                    status: "OK",
                    message: "User token is required",
                });
            }
            const result = await jwtService.refreshToken(token);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /user/product
    async getProduct(req, res, next) {
        try {
            const userId = req?.userId;
            if (!userId) {
                return res.status(400).json({
                    message: "User id is required",
                });
            }

            const result = await userService.getProduct(userId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [GET] /user/following
    async getFollowingShop(req, res, next) {
        try {
            const userId = req?.userId;
            if (!userId) {
                return res.status(400).json({
                    message: "User id is required",
                });
            }

            const result = await userService.getFollowingShop(userId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [POST] /user/cart
    async addToCart(req, res, next) {
        try {
            const { userId } = req;
            const { name, amount, image, price, productId } = req.body;
            if (!name || !amount || !image || !price || !productId) {
                return res.status(400).json({
                    message: "You need to fill all require field!",
                });
            }
            const cartData = {
                userId,
                name,
                amount: +amount,
                image,
                price: +price,
                productId,
            };

            const result = await userService.addToCart(cartData);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [POST] /user/follow
    async followShop(req, res, next) {
        try {
            const { userId } = req;
            const { shopId } = req.body;
            if (!shopId) {
                return res.status(400).json({
                    message: "Shop id is require!",
                });
            }
            const result = await userService.followShop({
                userId,
                shopId,
            });
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [POST] /user/unFollow
    async unFollowShop(req, res, next) {
        try {
            const { userId } = req;
            const { shopId } = req.body;
            if (!shopId) {
                return res.status(400).json({
                    message: "Shop id is require!",
                });
            }
            const result = await userService.unFollowShop({
                userId,
                shopId,
            });
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [POST] /sign-up
    async createUser(req, res, next) {
        try {
            const { name, email, password, confirmPassword, phone } = req.body;
            const reg = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
            const isCheckEmail = reg.test(email);
            if (!name || !email || !password || !confirmPassword || !phone) {
                return res
                    .status(200)
                    .json({ status: "err", message: "The input is required" });
            } else if (!isCheckEmail) {
                return res
                    .status(200)
                    .json({ status: "err", message: "The input is email" });
            } else if (password !== confirmPassword) {
                return res
                    .status(200)
                    .json({ status: "err", message: "Password must be equal" });
            }
            const result = await userService.create(req.body);
            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [PUT] /user/:id
    async updateUser(req, res, next) {
        try {
            const userId = req.params.id;
            const data = req.body;
            if (!userId) {
                return res.status(200).json({
                    status: "OK",
                    message: "User id is required",
                });
            }
            const result = await userService.update(userId, data);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [PUT] /user/cart/:id
    async increaseAmountProductInCart(req, res, next) {
        try {
            const { id } = req.params;
            const { amount } = req.body;
            if (!id) {
                return res.status(400).json({
                    message: "Missing cart id!",
                });
            }

            const result = await userService.increaseAmountProductInCart({
                cartId: id,
                amount: +amount,
            });
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [DELETE] /user/:id
    async deleteUser(req, res, next) {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(200).json({
                    status: "OK",
                    message: "User id is required",
                });
            }
            const result = await userService.deleteUser(userId);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }
    // [DELETE] /user/delete-many
    async deleteMany(req, res, next) {
        try {
            const userIds = req.body._id;
            if (!userIds) {
                return res.status(200).json({
                    status: "OK",
                    message: "User ids is required",
                });
            }
            const result = await userService.deleteMany(userIds);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    // [DELETE] /user/cart/:id
    async deleteCart(req, res, next) {
        try {
            const { id } = req.params;

            const result = await userService.deleteCart(id);

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }
}

module.exports = new userController();
