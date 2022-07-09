const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    cleanse: String,
    toner: String,
    serums: String,
    eye_cream: String,
    moisturiser: String,
    spf: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
