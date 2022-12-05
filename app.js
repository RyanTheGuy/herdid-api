import dotenv from "dotenv";
dotenv.config();

import Express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { logFormatter } from "./src/utils/utils.js";
import itemRouter from "./src/routes/itemRoutes.js";

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;
const PORT = process.env.PORT;

var app = Express();

app.use(bodyParser.json());
app.use("/api/items", itemRouter);

app.get("/api", (req, res) => {
    res.send("WELCOME TO CATTLETRAIL HERDID API");
});

app.use((error, req, res, next) => {
    console.log(logFormatter(error.toString()));
    return res.status(500).json({ error: "An internal error has occured" });
});

mongoose.Promise = global.Promise;
mongoose
    .connect(DATABASE_URL)
    .then(() => {
        console.log(logFormatter("Successfully connected to Database `" + DATABASE_NAME + "`"));
        console.log(logFormatter("API Running at /api on port " + PORT));
    })
    .catch((err) => console.log(logFormatter(err)));

export default app;
