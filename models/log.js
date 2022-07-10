const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const journalLogSchema = new Schema(
  {
    date: Date,
    description: String,
    productIds: [String],
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", journalLogSchema);

module.exports = Log;
