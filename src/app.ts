import "./utils/purge.js";

import express from "express";
import fileUpload from "express-fileupload";

import router from "./routes/router.js";
import headers from "./utils/header.js";
import errorHandler from "./utils/errors.js";

const app = express();

app.use(express.urlencoded({ extended: true }), fileUpload());

app.disable("x-powered-by");

app.use(router);

app.use(headers);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is runnnig...");
});
