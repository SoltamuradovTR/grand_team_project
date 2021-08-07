require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

mongoose.connect(
    process.env.MONGO,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    },
    () => {
        try {
            console.log("Database connected...");
        } catch (e) {
            console.log(`Error:${e.message}`);
        }
    }
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(require("./routes/index"));

app.listen(process.env.PORT, () => {
    try {
        console.log("Server initialised...");
    } catch (e) {
        console.log(`Error:${e.message}`);
    }
});