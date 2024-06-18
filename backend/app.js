const express = require("express");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
require("dotenv").config();

const dataRouter = require("./router/dataRoute");
const app = express();

app.use(express.json());

app.use("/api/data", dataRouter);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("listening on 5000");
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error); 
  });
