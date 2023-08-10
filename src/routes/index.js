const userRouter = require("./UserRouter");
const siteRouter = require("./siteRouter");

const routes = (app) => {
    app.use("/user", userRouter);
    app.use("/", siteRouter);
};

module.exports = routes;
