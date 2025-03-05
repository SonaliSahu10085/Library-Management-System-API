const express = require("express");
const bookController = require("../controllers/bookController");
const router = express.Router();

/* GET - Retrieves all books*/
router.get("/", bookController.getAllBooks);

/* POST - Add new book. */
router.post("/", bookController.addBook);

/* GET - Retrives a specific book by ID. */
router.get("/:id", bookController.getSpecificBook);

/* PUT - Updates a book by ID. */
router.put("/:id", bookController.updateBook);

/* DELETE - Deletes a book by ID. */
router.delete("/:id", bookController.deleteBook);

module.exports = router;
