const Book = require("../models/books");
const Review = require("../models/reviews");
const ExpressError = require("../utils/ExpressError");

// Get all reviews
exports.getAllReviews = async (req, res, next) => {
  const { id } = req.params;

  try {
    const reviews = await Book.findById(id).populate({
      path: "reviews",
      populate: { path: "user" },
    });

    res.json({
      message: "All Reviews",
      data: reviews,
    });
  } catch (e) {
    next(new ExpressError(500, e.message));
  }
};

// Add a reviews
exports.addReview = async (req, res, next) => {
  const { id } = req.params;
  const newReview = new Review({
    ...req.body,
  });
  await newReview.save();
  await Book.findByIdAndUpdate(id, { $push: { reviews: newReview._id } });

  res.status(201).json({
    message: "Review Created",
    data: [newReview],
  });
};

// Update a review
exports.updateReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    {
      ...req.body,
      updatedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  );
  await Book.findByIdAndUpdate(id, {
    $addToSet: { reviews: updatedReview._id },
  });
  res.json({
    message: "Review Updated",
    data: [updatedReview],
  });
};

// Delete a book
exports.deleteReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  await Book.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  const deletedReview = await Review.findByIdAndDelete(reviewId);
  res.json({ message: "Review deleted", data: [deletedReview] });
};
