const express = require("express");
const authorController = require("../controllers/authorController");
const wrapAsync = require("../utils/wrapAsync");
const { validateBody } = require("../middlewares/serverValidation");
const { isValidEntity, isUnique } = require("../middlewares/entityValidation");
const router = express.Router();

/* GET - Retrieves all authors*/
router.get("/", wrapAsync(authorController.getAllAuthors));

/* POST - Add new author. */
router.post("/", validateBody, isUnique, wrapAsync(authorController.addAuthor));

/* GET - Retrives a specific author by ID. */
router.get(
  "/:id",
  isValidEntity,
  wrapAsync(authorController.getSpecificAuthor)
);

/* PUT - Updates a author by ID. */
router.put(
  "/:id",
  isValidEntity,
  validateBody,
  wrapAsync(authorController.updateAuthor)
);

/* DELETE - Deletes a author by ID. */
router.delete("/:id", isValidEntity, wrapAsync(authorController.deleteAuthor));

module.exports = router;
