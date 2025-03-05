require("dotenv/config");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_LOCAL_URL);
    console.log("Database connected successfully");
  } catch (e) {
    console.log("Database connection failed", e);
  }
};

module.exports = connectDB; 