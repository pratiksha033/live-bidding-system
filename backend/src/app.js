const express = require("express");
const cors = require("cors");

const requestId = require("./middlewares/requestId.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const itemRoutes = require("./routes/item.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestId);

app.use("/items", itemRoutes);

app.use(errorMiddleware);

module.exports = app;
