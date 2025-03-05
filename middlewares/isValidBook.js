const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");
const Book = require("../models/books");

module.exports = async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId before querying
  if (!mongoose.isValidObjectId(id)) {
    return next(new ExpressError(400, "Invalid Book ID"));
  }

  const book = await Book.findById(id);
  if (!book) {
    return next(new ExpressError(404, "Book not available."));
  }
  next();
};
