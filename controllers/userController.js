const User = require("../models/users");
const ExpressError = require("../utils/ExpressError");

// Get all users
exports.getAllUsers = async (req, res, next) => {
  const { name, email, role, limit = 0 } = req.query;
  let filter = {}; // Default: empty filter (fetch all)

  if (name) filter.name = new RegExp(name, "i");
  if (email) filter.email = new RegExp(email, "i");
  if (role) filter.role = new RegExp(role, "i");

  try {
    const users = await User.find(filter).limit(Number(limit) || 0);
    res.json({
      message: "All Available Users",
      data: users,
    });
  } catch (e) {
    next(new ExpressError(500, e.message));
  }
};

// Add a user
exports.addUser = async (req, res, next) => {
  const newUser = new User({
    ...req.body,
  });
  await newUser.save();
  res.status(201).json({
    message: "User Created",
    data: [newUser],
  });
};

// Get a single user
exports.getSpecificUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    message: "Get user by ID",
    data: [user],
  });
};

// Update a user
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(
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
    message: "User Updated",
    data: [updatedUser],
  });
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);
  res.json({ message: "User deleted", data: [deletedUser] });
};

exports.uploadProfilePicture = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!req.file) {
      return next(new ExpressError(400, "Upload a profile photo for user"));
    }
    const user = await User.findById(id);

    // console.log(req.file);

    // Save image path in the database
    user.profilePicture = req.file.path;
    await user.save();

    res.status(200).json({
      message: "User profile picture uploaded successfully",
      data: [user],
    });
  } catch (error) {
    next(new ExpressError(500, error.message));
  }
};
