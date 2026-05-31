const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const querySchema = new Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Query: { type: String, required: true },
    Querystatus: { type: String, default: "Unread" },

  },
  { timestamps: true }
);

module.exports = model("query", querySchema);