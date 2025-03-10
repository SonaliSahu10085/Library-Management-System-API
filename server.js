require("dotenv/config");
const express = require("express");
const connectDb = require("./config/mongodb");
const ExpressError = require("./utils/ExpressError");

const booksRouter = require("./routes/books");
const authorsRouter = require("./routes/authors");
const usersRouter = require("./routes/users");
const loansRouter = require("./routes/loans");
const reviewsRouter = require("./routes/reviews");


const app = express();
const PORT = process.env.PORT || "3002";

// Connecting with DB
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", booksRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/users", usersRouter);
app.use("/api/loans", loansRouter);
app.use("/api/books/:id/reviews", reviewsRouter);


// ---- Middleware to handle non-existing endpoints
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Endpoint not exists!"));
});

// ---- Error handling middleware
app.use(function (err, req, res, next) {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json({ error: "File is too large, file size limit 1MB" });
  }
  res.status(err.statusCode || 500).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
