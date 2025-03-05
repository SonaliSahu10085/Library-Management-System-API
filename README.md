# Book Model - Library Management System

This Mongoose model defines the schema for managing books in a library system.

## Schema Fields

### 1. `title` (String, required)

- Represents the name of the book.
- **Example**: `"The Great Gatsby"`

### 2. `author` (String, required)

- Stores the name of the book's author.
- **Example**: `"F. Scott Fitzgerald"`

### 3. `publishedYear` (Number, required)

- The year when the book was published.
- **Example**: `1925`

### 4. `genre` (String, enum: `['Fiction', 'Non-Fiction', 'Mystery']`, default: `'Mystery'`)

- Represents the category or type of book (e.g., Fiction, Non-fiction, Mystery).
- **Example**: `"Mystery"`

### 5. `pages` (Number, required)

- The total number of pages in the book.
- **Example**: `218`

### 6. `copiesAvailable` (Number, default: `1`)

- The number of copies of the book available in the library.
- Default is `1`, meaning at least one copy is available.
- **Example**: `5` (if five copies of the book are available in the library).

### 7. `status` (String, enum: `['Available', 'Checked Out', 'Reserved']`, default: `'Available'`)

- Indicates the current status of the book:
  - `"Available"` → Book is available for borrowing.
  - `"Checked Out"` → Someone has borrowed the book.
  - `"Reserved"` → The book is reserved by a member.
- Default status is `"Available"`.

### 8. `timestamps` (Automatic)

- Mongoose adds `createdAt` and `updatedAt` timestamps to track when a book record is added or modified.
