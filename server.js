require("dotenv/config");
const express = require("express");
const ExpressError = require("./utils/ExpressError");


const indexRouter = require("./routes/index");
const booksRouter = require("./routes/books");

const app = express();
const PORT = process.env.PORT || "3002";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/books", booksRouter);

// ---- Middleware to handle non-existing endpoints
app.all("*", (req, res, next) => {
  res.status(404).json({ message: "Invalid Endpoint." });
});

// ---- Error handling middleware
app.use(function (err, req, res, next) {
  res.status(err.statusCode || 500).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
