const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");
const Book = require("../models/books");

exports.isValidBook = async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId before querying
  if (!mongoose.isValidObjectId(id)) {
    return next(new ExpressError(400, "Book id invalid"));
  }

  const book = await Book.findById(id);
  if (!book) {
    return next(new ExpressError(404, "Book not found."));
  }
  next();
};

exports.isUniqueTitle = async (req, res, next) => {
  const book = await Book.findOne({ title: req.body.title });
  if (!book) {
    return next();
  }
  next(new ExpressError(400, "Book already exists (Title Should be Unique)."));
};
