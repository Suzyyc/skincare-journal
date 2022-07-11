require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const skincareRouter = require("./controllers/skincare");
const logRouter = require("./controllers/log");

const PORT = process.env.PORT;
const dbURL = process.env.MONGODB_URL;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use("/skincare", skincareRouter);
app.use("/logs", logRouter);

mongoose.connect(dbURL, () => {
  console.log("connected to MongoDB");
});

app.listen(PORT, () => {
  console.log("Server started at port", PORT);
});
