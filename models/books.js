const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    publishedYear: { type: Number, required: true },
    pages: { type: Number, required: true },
    copiesAvailable: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["Available", "Checked Out", "Reserved"],
      default: "Available",
    },
    coverImage: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
