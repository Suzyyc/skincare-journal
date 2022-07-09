require("dotenv").config();

const mongoose = require("mongoose");
const Skincare = require("../models/skincare");
const Log = require("../models/log");

const data = require("./data");

const dbURL = process.env.MONGODB_URL;

mongoose.connect(dbURL, () => {
  console.log("Connected to Skincare db");
  console.log("Resetting Skincare collection");
  //   Product.insertMany(genericProducts);
  //   return;
  Skincare.collection
    .drop()
    .then(() => {
      console.log("Products collection dropped");
      console.log("Inserting seed data");
      return Skincare.insertMany(data.products);
    })
    .then((insertedProducts) => {
      console.log("Generic products inserted");
      console.log(insertedProducts);
    });
  Log.collection
    .drop()
    .then(() => {
      console.log("Products collection dropped");
      console.log("Inserting seed data");
      return Log.insertMany(data.logs);
    })
    .then((insertedLogs) => {
      console.log("Generic logs inserted");
      console.log(insertedLogs);
      mongoose.connection.close();
    });
});
