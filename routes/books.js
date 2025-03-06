const express = require("express");
const bookController = require("../controllers/bookController");
const wrapAsync = require("../utils/wrapAsync");
const { validateBook } = require("../middlewares/serverValidation");
const { isValidBook, isUniqueTitle } = require("../middlewares/book");
const router = express.Router();

/* GET - Retrieves all books*/
router.get("/", wrapAsync(bookController.getAllBooks));

/* POST - Add new book. */
router.post(
  "/",
  validateBook,
  isUniqueTitle,
  wrapAsync(bookController.addBook)
);

/* GET - Retrives a specific book by ID. */
router.get("/:id", isValidBook, wrapAsync(bookController.getSpecificBook));

/* PUT - Updates a book by ID. */
router.put(
  "/:id",
  isValidBook,
  validateBook,
  wrapAsync(bookController.updateBook)
);

/* DELETE - Deletes a book by ID. */
router.delete("/:id", isValidBook, wrapAsync(bookController.deleteBook));

module.exports = router;
