# Job Portal Backend 🚀

Backend API for a full-stack Job Portal application built using Node.js, Express.js, and MongoDB.

This backend provides secure REST APIs for authentication, job management, applications, and resume upload functionality.

---

## 🚀 Live Backend

Backend URL:

https://job-portal-backend-mh0z.onrender.com

---

# Features

## Authentication
- User registration
- User login
- JWT based authentication
- Password hashing using bcrypt
- Role-based authorization

Roles:
- Student
- Recruiter
- Admin


## Job Management

Recruiter features:
- Create jobs
- View posted jobs
- Update jobs
- Delete jobs

Student features:
- View available jobs
- Search jobs
- Filter jobs
- View job details


## Application Management

Student:
- Apply for jobs
- Track application status

Recruiter:
- View applicants
- Accept applications
- Reject applications


## Resume Management

- Upload resume in PDF format
- Store resume path
- View uploaded resume


---

# Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT
- bcrypt

### File Upload
- Multer

### Security
- Helmet
- Express Rate Limiter
- CORS


### Deployment
- Render


---

# Project Structure
backend
│
├── config
│ └── db.js
│
├── controllers
│ ├── authController.js
│ ├── jobController.js
│ ├── applicationController.js
│ └── userController.js
│
├── middleware
│ ├── authMiddleware.js
│ ├── uploadMiddleware.js
│ └── errorMiddleware.js
│
├── models
│ ├── User.js
│ ├── Job.js
│ └── Application.js
│
├── routes
│
├── uploads
│
└── server.js

---

# API Endpoints

## Authentication

### Register

### Login

---

## Jobs

### Create Job

### Get All Jobs

### Get Job By ID

### Update Job

### Delete Job

---

## Applications

### Apply Job

### Student Applications

### View Applicants

---

## Resume

### Upload Resume

---

# Environment Variables

Create a `.env` file:

---

# Installation

Clone repository:

Go inside project:

Install dependencies:

Run development server:

Server runs on:


---

# Deployment

Backend deployed using:

Render


---

# Future Improvements

- Cloud storage for resumes
- Email notifications
- Advanced recruiter analytics
- Real-time notifications
- Payment integration


---

# Author

Nigitha S S

Full Stack Web Development Project
