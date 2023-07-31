const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

// Router
const categoriesRouter = require("./app/api/v1/categories/router");
const imageRouter = require("./app/api/v1/images/router");
const talentsRouter = require("./app/api/v1/talents/router");
const eventsRouter = require("./app/api/v1/event/router");
const organizersRouter = require("./app/api/v1/organizers/router");
const authCMSRouter = require("./app/api/v1/auth/router");
const ordersRouter = require("./app/api/v1/orders/router");
const participantsRouter = require("./app/api/v1/participants/router");
const paymentsRouter = require("./app/api/v1/payments/router");
const userRefreshTokenRouter = require("./app/api/v1/userRefreshToken/router");
const v1 = "/api/v1";

// error Handling
const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handler-error");
// harus dibawah atas routernya
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
// express.urlencoded : extend :false .
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    messages: "Welcome To Server Semina",
  });
});
// penggunaan router
app.use(`${v1}/cms`, categoriesRouter);
app.use(`${v1}/cms`, imageRouter);
app.use(`${v1}/cms`, talentsRouter);
app.use(`${v1}/cms`, eventsRouter);
app.use(`${v1}/cms`, organizersRouter);
app.use(`${v1}/cms`, authCMSRouter);
app.use(`${v1}/cms`, ordersRouter);
app.use(`${v1}/cms`, paymentsRouter);
app.use(`${v1}/cms`, userRefreshTokenRouter);
app.use(`${v1}`, participantsRouter);

// pengunaan error handling, tidak di bolehin di tarok di atas router, karena nanti dijalankan terlebih dahulu.
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);
module.exports = app;
