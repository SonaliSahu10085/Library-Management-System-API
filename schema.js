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
    .items(joi.string().regex(/^[0-9a-fA-F]{24}$/)) // Validate MongoDB ObjectId format
    .unique() // Ensure no duplicate book IDs
    .default([]), // Book IDs stored as strings
});
