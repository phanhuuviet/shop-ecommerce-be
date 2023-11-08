const express = require("express");
const dotenv = require("dotenv").config();
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const io = require("./socket/index");
const http = require("http");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

app.use(cors());
app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
});
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
    })
);
app.use(bodyParser.text({ limit: "200mb" }));
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
