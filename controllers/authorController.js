const Author = require("../models/authors");
const ExpressError = require("../utils/ExpressError");

// Get all authors
exports.getAllAuthors = async (req, res, next) => {
  const { name, nationality, limit = 0 } = req.query;
  let filter = {}; // Default: empty filter (fetch all)

  if (name) filter.name = new RegExp(name, "i");
  if (nationality) filter.nationality = new RegExp(nationality, "i");

  try {
    const data = await Author.find(filter).limit(Number(limit) || 0); // Convert limit to number

    res.json({
      message: "All Available Authors",
      data,
    });
  } catch (e) {
    next(new ExpressError(500, e.message));
  }
};

// Add a author
exports.addAuthor = async (req, res, next) => {
  const newAuthor = new Author({
    ...req.body,
  });
  await newAuthor.save();
  res.status(201).json({
    message: "Author Created",
    data: [newAuthor],
  });
};

// Get a single author
exports.getSpecificAuthor = async (req, res, next) => {
  const { id } = req.params;
  const author = await Author.findById(id).populate("books");
  res.json({
    message: "Get author by ID",
    data: [author],
  });
};

// Update a author
exports.updateAuthor = async (req, res, next) => {
  const { id } = req.params;
  const updatedAuthor = await Author.findByIdAndUpdate(
    id,
    {
      ...req.body,
      updatedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  ).populate("books");
  res.json({
    message: "Author Updated",
    data: [updatedAuthor],
  });
};

// Delete a author
exports.deleteAuthor = async (req, res, next) => {
  const { id } = req.params;

  const deletedAuthor = await Author.findByIdAndDelete(id);
  res.json({ message: "Author deleted", data: [deletedAuthor] });
};
