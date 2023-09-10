import path from "path";

import express from "express";
import expressFileUpload from "express-fileupload";
import dotenv from "dotenv";
import appRootPath from "app-root-path";

import router from "./routes/router";
import errorHandler from "./middlewares/errors";
import headers from "./middlewares/headers";

dotenv.config({ path: "./configs/config.env" });

const app = express();

app.disable("x-powered-by");

//* Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(expressFileUpload());

//? Headers
app.use(headers);

//* Router
app.use(router);

//! Error Handling
app.use(errorHandler);

app.use(express.static(path.join(appRootPath.toString(), "upload")));

//* Past Uploads Cleaner
require("./utils/cleaner");

app.listen(process.env.PORT, () => {
  console.log(
    `Server is runnig on ${process.env.PORT} - ${process.env.NODE_ENV} Mode`
  );
});
