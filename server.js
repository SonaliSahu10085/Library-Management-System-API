require("dotenv/config");
const express = require("express");
const connectDb = require('./config/mongodb')
const ExpressError = require("./utils/ExpressError");


const booksRouter = require("./routes/books");
const authorsRouter = require("./routes/authors");


const app = express();
const PORT = process.env.PORT || "3002";

// Connecting with DB
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", booksRouter);
app.use("/api/authors", authorsRouter);


// ---- Middleware to handle non-existing endpoints
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Endpoint not exists!"));
});

// ---- Error handling middleware
app.use(function (err, req, res, next) {
  res.status(err.statusCode || 500).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
