const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");
const Book = require("../models/books");
const Author = require("../models/authors");
const User = require("../models/users");
const Loan = require("../models/loans");
const Review = require("../models/reviews");

exports.isValidEntity = async (req, res, next) => {
  const { id, reviewId } = req.params;

  let Model;
  let entity;

  if (req.baseUrl.includes("reviews")) {
    Model = Review;
    entity = "Review";
  }

  if (req.baseUrl.includes("authors")) {
    Model = Author;
    entity = "Author";
  }

  if (req.baseUrl.includes("books")) {
    Model = Book;
    entity = "Book";
  }

  if (req.baseUrl.includes("users")) {
    Model = User;
    entity = "User";
  }

  if (req.baseUrl.includes("loans")) {
    Model = Loan;
    entity = "Loan";
  }

  if (id && reviewId && !mongoose.isValidObjectId(reviewId)) {
    return next(new ExpressError(400, `${entity} ID invalid.`));
  }

  // Validate ObjectId before querying
  if (!mongoose.isValidObjectId(id)) {
    return next(new ExpressError(400, `${entity} ID invalid.`));
  }

  const _entity = await Model.findById(id);
  if (!_entity) {
    return next(new ExpressError(404, `${entity} not found.`));
  }
  next();
};

exports.isUnique = async (req, res, next) => {
  let Model;
  let entity;
  let condition = {};

  if (req.baseUrl.includes("authors")) {
    Model = Author;
    entity = "Author";
    condition = { name: req.body.name };
  }

  if (req.baseUrl.includes("books")) {
    Model = Book;
    entity = "Book";
    condition = { title: req.body.title };
  }

  if (req.baseUrl.includes("users")) {
    Model = User;
    entity = "User";
    condition = { email: req.body.email };
  }

  if (req.baseUrl.includes("loans")) {
    Model = Loan;
    entity = "Loan";
    condition = { user: req.body.user };
  }

  const _entity = await Model.findOne(condition);
  if (!_entity) {
    return next();
  }
  next(new ExpressError(400, `${entity} already exists`));
};
