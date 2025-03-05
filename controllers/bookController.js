const Book = require("../models/books");
const ExpressError = require("../utils/ExpressError");

// Get all books
exports.getAllBooks = async (req, res, next) => {
  res.json({
    message: "All Available Books",
  });
  //   try {
  //     const books = await Book.find();
  //     res.json({
  //       message: "All Available Books",
  //       data: books,
  //     });
  //   } catch (e) {
  //     next(new ExpressError(500, e.message));
  //   }
};

// Add a Book
exports.addBook = async (req, res, next) => {
  res.json({
    message: "Book Created",
  });
  //   const newBook = new Book(req.body);
  //   await newBook.save();
  //   res.status(201).json({
  //     message: "Book Created",
  //     data: [newBook],
  //   });
};

// Get a single book
exports.getSpecificBook = async (req, res, next) => {
  res.json({
    message: "Specific Book",
  });
  //   const { id } = req.params;
  //   const book = await Book.findById(id);
  //   res.json({
  //     message: "Specific Book",
  //     data: [book],
  //   });
};

// Update a book
exports.updateBook = async (req, res, next) => {
  res.json({
    message: "Book Updated",
  });
  //   const { id } = req.params;
  //   const updatedBook = await Book.findByIdAndUpdate(
  //     id,
  //     { ...req.body },
  //     {
  //       new: true,
  //       runValidators: true,
  //     }
  //   );
  //   res.json({
  //     message: "Book Updated",
  //     data: [updatedBook],
  //   });
};

// Delete a book
exports.deleteBook = async (req, res, next) => {
  res.json({
    message: "Book deleted",
  });
  //   const { id } = req.params;
  //   const deletedBook = await Book.findByIdAndDelete(id);
  //   res.json({ message: "Book deleted", data: [deletedBook] });
};
