const ExpressError = require("../utils/ExpressError");
const { bookSchema, authorSchema } = require("../schema");

//Server side validation middleware

exports.validateBody = (req, res, next) => {
  let schema;
  if (req.baseUrl.includes("authors")) {
    schema = authorSchema;
  }

  if (req.baseUrl.includes("books")) {
    schema = bookSchema;
  }

  const { error } = schema.validate(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    return next(new ExpressError(400, errMsg));
  }
  next();
};
