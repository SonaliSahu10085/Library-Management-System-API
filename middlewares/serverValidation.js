const ExpressError = require("../utils/ExpressError");
const {
  bookSchema,
  authorSchema,
  userSchema,
  loanSchema,
  reviewSchema,
} = require("../schema");

//Server side validation middleware

exports.validateBody = (req, res, next) => {
  let schema;

  if (req.baseUrl.includes("authors")) {
    schema = authorSchema;
  }

  if (req.baseUrl.includes("books")) {
    if (req.baseUrl.includes("reviews")) {
      schema = reviewSchema;
    } else {
      schema = bookSchema;
    }
  }

  if (req.baseUrl.includes("users")) {
    schema = userSchema;
  }

  if (req.baseUrl.includes("loans")) {
    schema = loanSchema;
  }

  const { error } = schema.validate(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    return next(new ExpressError(400, errMsg));
  }
  next();
};
