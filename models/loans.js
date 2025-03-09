const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who borrowed the book
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true }, // Which book is borrowed
    borrowDate: { type: Date, default: Date.now() }, // When the book was borrowed
    returnDate: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }, // Due date (7 days later)
    isReturned: { type: Boolean, default: false }, // Whether the book has been returned
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema);
