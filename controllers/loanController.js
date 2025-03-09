const Loan = require("../models/loans");
const ExpressError = require("../utils/ExpressError");

// Get all loans
exports.getAllLoans = async (req, res, next) => {
  try {
    const data = await Loan.find().populate("user").populate("book");
    res.json({
      message: "All Available Loans",
      data,
    });
  } catch (e) {
    next(new ExpressError(500, e.message));
  }
};

// Add a loan
exports.addLoan = async (req, res, next) => {
  const newLoan = new Loan({
    ...req.body,
  });
  await newLoan.save();
  res.status(201).json({
    message: "Loan Created",
    data: [newLoan],
  });
};

// Update a loan
exports.updateLoan = async (req, res, next) => {
  const { id } = req.params;
  const updatedLoan = await Loan.findByIdAndUpdate(
    id,
    {
      ...req.body,
      updatedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json({
    message: "Loan Updated",
    data: [updatedLoan],
  });
};

// Delete a loan
exports.deleteLoan = async (req, res, next) => {
  const { id } = req.params;

  // First, mark the loan as returned
  await Loan.findByIdAndUpdate(id, { isReturned: true });

  const deletedLoan = await Loan.findByIdAndDelete(id);
  res.json({ message: "Loan deleted", data: [deletedLoan] });
};
