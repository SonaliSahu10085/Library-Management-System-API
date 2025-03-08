const multer = require("multer");
const moment = require("moment");
const path = require("path");
const ExpressError = require("../utils/ExpressError");

// Set storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.baseUrl.includes("books")) {
      // Save files in the 'uploads' directory
      cb(null, "uploads/BookCover/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${moment().format("DD-MMM-YYYY-hh-mm-ss")}-${file.originalname}`);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(
      new ExpressError(400, "Only JPEG, JPG, and PNG files are allowed"),
      false
    );
  }
};

// Upload middleware with limits
const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
  fileFilter,
});

module.exports = upload;
