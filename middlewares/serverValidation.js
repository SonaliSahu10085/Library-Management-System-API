const ExpressError = require("../utils/ExpressError");
const { bookSchema} = require("../schema");

//Server side validation middleware

exports.validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    return next(new ExpressError(400, errMsg));
  }
  next();
};

