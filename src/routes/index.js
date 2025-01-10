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
const { default: rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, // 30 seconds
    max: 5, // Limit each IP to 5 requests per windowMs
    message:
        "Too many requests from this IP, please try again after 15 minutes.",
    standardHeaders: true, // Include rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const routes = (app) => {
    app.use("/sign-in", limiter, loginRouter);
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
