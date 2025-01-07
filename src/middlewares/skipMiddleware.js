const skipMiddleware = (middleware, excludedPaths) => {
    return (req, res, next) => {
        if (excludedPaths.includes(req.path)) {
            return next(); // Skip middleware
        }
        return middleware(req, res, next); // Apply middleware
    };
};

module.exports = {
    skipMiddleware,
};
