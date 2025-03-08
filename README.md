# Library Management System

# 1. Book Model

This Mongoose model defines the schema for managing books in a library system.

## Schema Fields

### 1. `title` (String, required)

- Represents the name of the book.
- **Example**: `"The Great Gatsby"`

### 2. `author` (ObjectId, required, references `Author`)

- Stores the reference to the `Author` model.
- **Example**: `"65f1a4b2c1e62d001cbf1234"` (MongoDB ObjectId of an author)

### 3. `publishedYear` (Number, required)

- The year when the book was published.
- **Example**: `1925`

### 4. `pages` (Number, required)

- The total number of pages in the book.
- **Example**: `218`

### 5. `copiesAvailable` (Number, default: `1`)

- The number of copies of the book available in the library.
- Default is `1`, meaning at least one copy is available.
- **Example**: `5` (if five copies of the book are available in the library).

### 6. `status` (String, enum: `['Available', 'Checked Out', 'Reserved']`, default: `'Available'`)

- Indicates the current status of the book:
  - `"Available"` → Book is available for borrowing.
  - `"Checked Out"` → Someone has borrowed the book.
  - `"Reserved"` → The book is reserved by a member.
- Default status is `"Available"`.

### 7. `timestamps` (Automatic)

- Mongoose adds `createdAt` and `updatedAt` timestamps to track when a book record is added or modified.


# 2. Author Model

This Mongoose model defines the schema for managing authors in a library system.

## Schema Fields

### 1. `name` (String, required)

- Represents the full name of the author.
- **Example**: `"J.K. Rowling"`

### 2. `birthYear` (Number)

- The year when the author was born.
- **Example**: `1965`

### 3. `nationality` (String)

- The nationality of the author.
- **Example**: `"British"`

### 4. `books` (Array of ObjectIds, ref: `Book`)

- A list of book IDs written by the author.
- References the `Book` model.
- **Example**:
  ```json
  [
    "65f1a4b2c1e62d001cbf1234",
    "65f1a4b2c1e62d001cbf5678"
  ]
  ```

### 5. `timestamps` (Automatic)

- Mongoose adds `createdAt` and `updatedAt` timestamps to track when an author record is added or modified.
