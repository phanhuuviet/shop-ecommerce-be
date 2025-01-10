const express = require("express");
const dotenv = require("dotenv").config();
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const io = require("./socket/index");
const http = require("http");
const { skipMiddleware } = require("./middlewares/skipMiddleware");
const { encodedResponseMiddleware } = require("./middlewares/encodeResponse");
const { default: rateLimit } = require("express-rate-limit");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

// Rate Limiting Middleware
const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, // 30 seconds
    max: 5, // Limit each IP to 5 requests per windowMs
    message:
        "Too many requests from this IP, please try again after 15 minutes.",
    standardHeaders: true, // Include rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiter to all requests
app.use(limiter);

app.use(cors());
app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
});
app.use(
    skipMiddleware(encodedResponseMiddleware, [
        "/decoded",
        "/sign-in/login_noSqlInjection",
        "/sign-in/login_withPreventNoSqlInjection",
    ])
);
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
    })
);
app.use(bodyParser.text({ limit: "200mb" }));
app.use(cookieParser());
io.attach(server);

routes(app);

mongoose
    .connect(
        `mongodb+srv://phanhuuviet1:Phanviet2002@shop-ecommerce.m0qawbh.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`
    )
    .then(() => {
        console.log("connect success");
    })
    .catch((err) => {
        console.log(err);
    });

require("./cronjob");

// mongoose
//     .connect("mongodb://localhost:27017/shop-ecommerce")
//     .then(() => {
//         console.log("Connected to database");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
