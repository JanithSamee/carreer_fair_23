import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import functions from "firebase-functions";
import router from "./routes/_index.routes.js";

const NODE_ENV = process.env.NODE_ENV || "dev";
const ENV_TEST = process.env.ENV_TEST;
const FRONT_END_URL = process.env.FRONT_END_URL;
const app = express();
app.use(cors({ origin: NODE_ENV === "dev" ? "*" : FRONT_END_URL }));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/", router);

app.get("/v1/test/", (req, res) => {
    const time = new Date();
    console.info("Test OK!");
    console.info(ENV_TEST);
    console.log(time);
    res.send({ msg: "Test OK!", time: time, env: ENV_TEST });
});

const api = functions.https.onRequest(app);
export { api };
