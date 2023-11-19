const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageMiddleware = async (req, res, next) => {
    const image = req.body?.image ? req.body?.image : req.body?.avatar;
    try {
        if (image) {
            await cloudinary.uploader
                .upload(image)
                .then((result) => {
                    const { secure_url } = result;
                    req.body.image = secure_url;
                    req.body.avatar = secure_url;
                    next();
                })
                .catch((err) => {
                    return res.status(500).json({
                        message: "Internal server error",
                        status: "ERROR",
                    });
                });
        } else {
            next();
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            status: "ERROR",
        });
    }
};

module.exports = {
    imageMiddleware,
};
