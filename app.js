const express = require("express");
const expressFileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const router = require("./routes/router");
const { setHeaders } = require("./middlewares/headers");
const { errorHandler } = require("./middlewares/errors");

dotenv.config({ path: "./configs/config.env" });

const app = express();

app.disable("x-powered-by");

//* Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(expressFileUpload());

//* Router
app.use(router);

app.use(express.static("uploads"));

//! Error Handler
app.use(errorHandler);

//? Set Headers
app.use(setHeaders);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is runnig on port ${process.env.PORT} - ${process.env.NODE_ENV} Mode`
  );
});
