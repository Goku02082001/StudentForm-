# 🎓 Task Assignment System

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows students to register, log in, submit assignments, and view their submissions — built with modern UI and secure authentication.

---

## 📁 Project Structure

### 🖥️ Backend (`/Backend`)
Node.js + Express server for authentication, assignment submission, and fetching student data.

#### 📂 Folder Structure:
Backend/
├── index.js # Entry point
├── controller/
│ ├── AuthController.js
│ ├── AuthLoginController.js
│ ├── submissionController.js
│ └── showSubmission.js
├── db/
│ └── db.js # MongoDB connection
├── middleware/
│ └── authMiddleware.js # JWT token verification
├── models/
│ ├── studentAuth.js # Student schema
│ └── Submission.js # Assignment schema
├── routes/
│ ├── authRoutes.js
│ ├── submissionRoutes.js
│ └── showSubmission.js
├── .env # Environment variables


#### 📦 Backend Dependencies
- express
- mongoose
- dotenv
- jsonwebtoken
- bcrypt
- multer
- cloudinary
- cors
- multer-storage-cloudinary

#### 🔐 Environment Variables
Create a `.env` file in `/backend`:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_URL=your_cloudinary_url

Run the Backend
cd backend
npm install
node index.js

🌐 Frontend/TaskAssignment/
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

Run the Frontend
cd Frontend/TaskAssignment
npm install
npm run dev

🔐 Authentication Flow
Register/Login → POST /api/register, POST /api/login

On successful login → JWT stored in localStorage.

Protected routes are accessed using authMiddleware on the backend.

📦 APIs Overview
Method	Route	Description
POST	/api/register	Register new student
POST	/api/login	Login & get JWT
POST	/api/submit	Submit assignment
GET	/api/getSubmission	View all submissions (admin/student)
