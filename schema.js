const joi = require("joi");

exports.bookSchema = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  publishedYear: joi.number().min(0).required(),
  pages: joi.number().required().min(1),
  copiesAvailable: joi.number().min(1).default(1),
  status: joi
    .string()
    .valid("Available", "Checked Out", "Reserved")
    .default("Available"),
});

exports.authorSchema = joi.object({
  name: joi.string().required(),
  bio: joi.string().default(""),
  nationality: joi.string().required(),
  books: joi
    .array()
    .items(joi.string().regex(/^[0-9a-fA-F]{24}$/)).messages({ "string.pattern.base": "Invalid Book ID format" }) // Validate MongoDB ObjectId format
    .default([]), // Book IDs stored as strings
});

exports.userSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().email().trim().lowercase().required(),
  role: joi.string().valid("member", "librarian", "admin").default("member"),
  profilePicture: joi.string().default(""),
});

exports.loanSchema = joi.object({
  user: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({ "string.pattern.base": "Invalid User ID format" }),
  book: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({ "string.pattern.base": "Invalid Book ID format" }),
  borrowDate: joi.date().default(() => new Date()), // Default to current date
  returnDate: joi
    .date()
    .default(() => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // 7 days later
  isReturned: joi.boolean().default(false), // Default is not returned
});
