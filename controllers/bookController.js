const Book = require("../models/books");
const ExpressError = require("../utils/ExpressError");

// Get all books
exports.getAllBooks = async (req, res, next) => {
  const { title, author, status, limit = 0 } = req.query;
  let filter = {}; // Default: empty filter (fetch all)

  if (title) filter.title = new RegExp(title, "i");
  if (author) filter.author = new RegExp(author, "i");
  if (status) filter.status = new RegExp(status, "i");

  try {
    const books = await Book.find(filter)
      .populate("author")
      .limit(Number(limit) || 0);
    res.json({
      message: "All Available Books",
      data: books,
    });
  } catch (e) {
    next(new ExpressError(500, e.message));
  }
};

// Add a Book
exports.addBook = async (req, res, next) => {
  const newBook = new Book({
    ...req.body,
  });
  await newBook.save();
  res.status(201).json({
    message: "Book Created",
    data: [newBook],
  });
};

// Get a single book
exports.getSpecificBook = async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findById(id).populate("author");
  res.json({
    message: "Get book by ID",
    data: [book],
  });
};

// Update a book
exports.updateBook = async (req, res, next) => {
  const { id } = req.params;
  const updatedBook = await Book.findByIdAndUpdate(
    id,
    {
      ...req.body,
      updatedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json({
    message: "Book Updated",
    data: [updatedBook],
  });
};

// Delete a book
exports.deleteBook = async (req, res, next) => {

  const { id } = req.params;

  const deletedBook = await Book.findByIdAndDelete(id);
  res.json({ message: "Book deleted", data: [deletedBook] });
};

exports.uploadBookCover = async (req, res, next) => {
  const { id } = req.params;

  try {
  
    if (!req.file) {
      return next(new ExpressError(400, "Upload a cover image for book"));
    }
    const book = await Book.findById(id);

    if (!book) {
      return next(new ExpressError(404, "Book not found"))
    }

    console.log(req.file);

    // Save image path in the database
    book.coverImage = req.file.path;
    await book.save();

    res.status(200).json({
      message: "Book cover uploaded successfully",
      coverImageUrl: req.file.path,
    });
  } catch (error) {
    next(new ExpressError(500, error.message))
  }
};
