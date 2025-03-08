const express = require("express");
const bookController = require("../controllers/bookController");
const wrapAsync = require("../utils/wrapAsync");
const { validateBody } = require("../middlewares/serverValidation");
const { isValidEntity, isUnique } = require("../middlewares/entityValidation");
const upload = require("../middlewares/upload");
const router = express.Router();

/* GET - Retrieves all books*/
router.get("/", wrapAsync(bookController.getAllBooks));

/* POST - Add new book. */
router.post("/", validateBody, isUnique, wrapAsync(bookController.addBook));

/* GET - Retrives a specific book by ID. */
router.get("/:id", isValidEntity, wrapAsync(bookController.getSpecificBook));

/* PUT - Updates a book by ID. */
router.put(
  "/:id",
  isValidEntity,
  validateBody,
  wrapAsync(bookController.updateBook)
);

/* DELETE - Deletes a book by ID. */
router.delete("/:id", isValidEntity, wrapAsync(bookController.deleteBook));

/* POST - Upload book cover image */
router.post("/:id/upload-cover", upload.single("coverImage"), wrapAsync(bookController.uploadBookCover));


module.exports = router;
