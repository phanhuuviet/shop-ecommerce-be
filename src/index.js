const express = require("express");
const dotenv = require("dotenv").config();
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

routes(app);

mongoose
    .connect("mongodb://localhost:27017/shop-ecommerce")
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
