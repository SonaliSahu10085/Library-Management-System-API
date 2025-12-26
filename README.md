# 📚 Library Management System (LMS) APIs

Welcome to the backend of the **Library Management System (LMS)**.  
This project is a **RESTful API** designed to manage a library’s complete ecosystem — from books and authors to users, loans, and reviews.

The project was developed over a **10-day structured plan** to demonstrate real-world backend development practices such as API design, database modeling, validation, and documentation.

🚀 **GitHub Repository:**  
https://github.com/SonaliSahu10085/LMS-APIs  

📄 **API Documentation:**  
[https://docs.google.com/document/d/1HlP2RvzY4Li_B4oGI9G1T3o3MRpM5Y-R5e3WR4e4Vks/edit?usp=sharing](https://docs.google.com/document/d/1HlP2RvzY4Li_B4oGI9G1T3o3MRpM5Y-R5e3WR4e4Vks/edit?usp=sharing)

📄 **Development Branch:**  
All active development and testing were done in the `test` branch.

---

## 🌟 Project Overview

The main objective of this project is to build a **scalable and well-structured backend API** using the MERN backend stack (without React).

This system helps manage library operations efficiently and provides hands-on experience with:
- RESTful API design
- MongoDB data modeling
- Git & GitHub workflow
- API testing using Postman

---

## 🔑 Core Functionalities

- **Book & Author Management**  
  Full CRUD operations to create and maintain the library catalog.

- **User Management**  
  Member registration, profile creation, and user-related operations.

- **Loan System**  
  Handles borrowing and returning of books with proper tracking.

- **Reviews & Ratings**  
  Users can rate and review books, creating a feedback system.

---

## ✨ Key Features

- **RESTful Architecture**  
  Clean and predictable endpoints for all resources.

- **File Upload Support**  
  Integrated **Multer** middleware for uploading book covers and user profile images.

- **Data Persistence**  
  MongoDB with Mongoose for schema-based and flexible data modeling.

- **Validation & Error Handling**  
  Handles invalid IDs, missing data, and edge cases gracefully.

- **Pagination Support**  
  Implemented in GET requests to improve performance for large datasets.

---

## 🛠 Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB & Mongoose  
- **Middleware:** Multer (File Uploads)  
- **Version Control:** Git & GitHub  
- **API Testing:** Postman
- **API Documentation:** Google Docs

---

## 📂 Folder Structure

The project follows a clean and modular structure to separate concerns:

```text
LMS-APIs/
│
├── controllers/     # Request handling and business logic
├── models/          # Database schemas (Book, Author, User, Loan, Review)
├── routes/          # API route definitions
├── middleware/      # Custom middleware (e.g., Multer)
├── config/          # Database connection & environment setup
├── utils/           # Reusable helper functions
├── .env             # For environment variables       
├── server.js        # Application entry point
└── package.json
```
---
## 🚀 Installation & Setup
1️⃣ Clone the repository
```bash
git clone https://github.com/SonaliSahu10085/LMS-APIs.git
```

2️⃣ Navigate to the project directory
```bash
cd LMS-APIs
```

3️⃣ Install dependencies
```bash
npm install
```

4️⃣ Configure Environment Variables

**Create a .env file in the root directory and add:**
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

5️⃣ Run the server
```bash
node server.js
```
The API will start running on the configured port.

---
## 🧪 API Testing

- All APIs were tested using Postman
- CRUD operations were validated for all major modules
- Pagination, error handling, and edge cases were tested thoroughly
- 
---
## 🚀 Future Enhancements

- 🔐 JWT-based authentication and role-based access control
- 📊 Admin dashboard APIs
- 📅 Due-date reminders and fine calculation
- 📈 Analytics for most borrowed books
- 🧾 API documentation using Swagger/OpenAPI

---
## 🎓 Learning Outcomes

- Gained strong understanding of RESTful API design
- Learned proper MongoDB schema relationships
- Improved skills in Express middleware and validation
- Practiced real-world GitHub workflow
- Strengthened debugging and API testing skills using Postman

---
## 👩‍💻 Author
Developed Sonali Sahu |BCA Student | Backend & Full-Stack Aspirant
Building scalable backend systems with clean architecture 🚀
