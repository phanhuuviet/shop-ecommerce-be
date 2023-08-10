const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
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
