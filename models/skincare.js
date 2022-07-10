const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkincareSchema = new Schema(
  {
    name: String,
    kind: {
      type: String,
      enum: [
        "cleanser",
        "toner",
        "serum",
        "eye_cream",
        "moisturiser",
        "spf",
        "generic",
      ],
      default: "generic",
    },
  },
  { timestamps: true }
);

const SkincareProducts = mongoose.model("Skincare", SkincareSchema);

module.exports = SkincareProducts;
