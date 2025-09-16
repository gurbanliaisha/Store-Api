require("dotenv").config();

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const express = require("express");
require("express-async-errors");

const connectDB = require("./db/connect");
const productRouter = require("./routes/products");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>Products Route</a>");
});

app.use("/api/v1/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port:${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
