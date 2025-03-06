const joi = require("joi");

exports.bookSchema = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  publishedYear: joi.number().min(0).required(),
  pages: joi.number().required().min(1),
  copiesAvailable: joi.number().min(1).default(1),
  status: joi.string().valid("Available", "Checked Out", "Reserved").default("Available")
});


