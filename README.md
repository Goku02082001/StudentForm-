# 🎓 Task Assignment System

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows students to register, log in, submit assignments, and view their submissions — built with modern UI and secure authentication.

---

## 📁 Project Structure
<details>
<summary>📂 Folder Structure</summary>

```text
backend/
├── index.js                  # Entry point
├── controller/
│   ├── AuthController.js
│   ├── AuthLoginController.js
│   ├── submissionController.js
│   └── showSubmission.js
├── db/
│   └── db.js                 # MongoDB connection
├── middleware/
│   └── authMiddleware.js     # JWT token verification
├── models/
│   ├── studentAuth.js        # Student schema
│   └── Submission.js         # Assignment schema
├── routes/
│   ├── authRoutes.js
│   ├── submissionRoutes.js
│   └── showSubmission.js
├── .env                      # Environment variables

Backend Dependencies
express

mongoose

dotenv

jsonwebtoken

bcrypt

multer

cloudinary

cors

multer-storage-cloudinary

PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_URL=your_cloudinary_url


cd backend
npm install
node index.js


Frontend/TaskAssignment/
├── src/
│   ├── App.jsx
│   ├── page/
│   │   ├── Login.jsx
│   │   ├── SubmissionForm.jsx
│   │   └── ShowSubmission.jsx
│   └── sidebar/
│       └── Sidebar.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js


Features
Responsive and animated Sidebar

Authentication using JWT

Assignment submission with file uploads

View all submissions

Logout functionality

Frontend Dependencies
react

react-dom

react-router-dom

tailwindcss

lucide-react

axios

cd Frontend/TaskAssignment
npm install
npm run dev


🔐 Authentication Flow
POST /api/register and POST /api/login for student registration/login

On successful login, JWT is stored in localStorage

Backend uses authMiddleware to protect routes

| Method | Route              | Description          |
| ------ | ------------------ | -------------------- |
| POST   | /api/register      | Register new student |
| POST   | /api/login         | Login & get JWT      |
| POST   | /api/submit        | Submit assignment    |
| GET    | /api/getSubmission | View all submissions |
