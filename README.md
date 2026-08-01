# Job Portal Backend (MERN Stack)

A full-stack Job Portal backend application built using Node.js, Express.js, MongoDB, and JWT authentication.

This project provides APIs for students and recruiters to manage job applications, profiles, resumes, and job postings.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Role Based Authorization

### Student Module
- Create and Update Profile
- Upload Resume
- Browse Jobs
- Search Jobs
- Filter Jobs
- Apply for Jobs
- View Applied Jobs

### Recruiter/Admin Module
- Create Jobs
- Update Jobs
- Delete Jobs
- View Applicants
- Accept/Reject Applications

### Advanced Features
- File Upload using Multer
- MongoDB Relationships
- Search Queries
- Filtering
- Pagination
- Error Handling Middleware
- Security using Helmet
- API Rate Limiting

---

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT
- bcrypt

### Tools
- Postman
- Git & GitHub

---

## Project Structure

```text
backend
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── jobController.js
│   └── applicationController.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── uploadMiddleware.js
│   └── errorMiddleware.js
│
├── models
│   ├── user.js
│   ├── Job.js
│   └── Application.js
│
├── routes
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   └── applicationRoutes.js
│
├── utils
│   └── generateToken.js
│
├── uploads
│
├── server.js
├── package.json
└── .env
```

