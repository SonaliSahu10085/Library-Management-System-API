const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviewController");
const wrapAsync = require("../utils/wrapAsync");
const { validateBody } = require("../middlewares/serverValidation");
const { isValidEntity } = require("../middlewares/entityValidation");

/* GET - Retrieves all reviews of a book*/
router.get("/", wrapAsync(reviewController.getAllReviews));

/* POST - Add a new review for a book. */
router.post("/", validateBody, wrapAsync(reviewController.addReview));

/* PUT - Updates a review of a book by ID. */
router.put(
  "/:reviewId",
  isValidEntity,
  validateBody,
  wrapAsync(reviewController.updateReview)
);

/* DELETE - Deletes a review of a book by ID. */
router.delete(
  "/:reviewId",
  isValidEntity,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
