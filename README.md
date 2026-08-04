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

```
backend
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── jobController.js
│   ├── applicationController.js
│   └── userController.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── uploadMiddleware.js
│   └── errorMiddleware.js
│
├── models
│   ├── User.js
│   ├── Job.js
│   └── Application.js
│
├── routes
│
├── uploads
│
└── server.js
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```


## Jobs

### Create Job

```
POST /api/jobs
```

### Get All Jobs

```
GET /api/jobs
```

### Get Job By ID

```
GET /api/jobs/:id
```

### Update Job

```
PUT /api/jobs/:id
```

### Delete Job

```
DELETE /api/jobs/:id
```


## Applications

### Apply Job

```
POST /api/applications
```

### Student Applications

```
GET /api/applications/student
```

### View Applicants

```
GET /api/applications/job/:jobId
```


## Resume

### Upload Resume

```
PUT /api/users/resume
```

---

# Environment Variables

Create a `.env` file:

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# Installation

Clone repository:

```
git clone https://github.com/nigithaselvan-dev/job-portal-backend.git
```

Go inside project:

```
cd job-portal-backend
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Server runs on:

```
http://localhost:5000
```

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
