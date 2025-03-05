const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    genre: {
      type: String,
      enum: ["Fiction", "Non-Fiction", "Mystery"],
      default: "Mystery",
    },
    pages: { type: Number, required: true },
    copiesAvailable: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["Available", "Checked Out", "Reserved"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
