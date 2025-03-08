const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");
const Book = require("../models/books");
const Author = require("../models/authors");

exports.isValidEntity = async (req, res, next) => {
  const { id } = req.params;

  let Model;
  let entity;

  if (req.baseUrl.includes("authors")) {
    Model = Author;
    entity = "Author";
  }

  if (req.baseUrl.includes("books")) {
    Model = Book;
    entity = "Book";
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

  const _entity = await Model.findOne(condition);
  if (!_entity) {
    return next();
  }
  next(new ExpressError(400, `${entity} already exists`));
};
