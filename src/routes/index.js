const userRouter = require("./userRouter");
const siteRouter = require("./siteRouter");
const loginRouter = require("./loginRouter");
const signUpRouter = require("./signUpRouter");
const productRouter = require("./productRouter");
const orderRouter = require("./orderRouter");
const paymentRouter = require("./paymentRouter");
const chatRouter = require("./chatRouter");
const messageRouter = require("./messageRouter");
const requestRouter = require("./requestRouter");

const routes = (app) => {
    app.use("/sign-in", loginRouter);
    app.use("/sign-up", signUpRouter);
    app.use("/user", userRouter);
    app.use("/product", productRouter);
    app.use("/order", orderRouter);
    app.use("/payment", paymentRouter);
    app.use("/chat", chatRouter);
    app.use("/message", messageRouter);
    app.use("/request", requestRouter);
    app.use("/", siteRouter);
};

module.exports = routes;
