const userRouter = require("./UserRouter");
const siteRouter = require("./siteRouter");
const loginRouter = require("./loginRouter");
const signUpRouter = require("./signUpRouter");
const productRouter = require("./productRouter");
const orderRouter = require("./orderRouter");
const paymentRouter = require("./paymentRouter");

const routes = (app) => {
    app.use("/sign-in", loginRouter);
    app.use("/sign-up", signUpRouter);
    app.use("/user", userRouter);
    app.use("/product", productRouter);
    app.use("/order", orderRouter);
    app.use("/payment", paymentRouter);
    app.use("/", siteRouter);
};

module.exports = routes;
