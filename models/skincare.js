const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkincareSchema = new Schema(
  {
    name: String,
    kind: {
      type: String,
      enum: [
        "Cleanser",
        "Toner",
        "Serum",
        "Eye_Cream",
        "Moisturiser",
        "SPF",
        "Generic",
      ],
      default: "Generic",
    },
    userId: String,
  },
  { timestamps: true }
);

const SkincareProduct = mongoose.model("SkincareProduct", SkincareSchema);

module.exports = SkincareProduct;
