const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const errorHandler = require("./middleware/errorMiddleware");


dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || "development";
connectDB();


const app = express();


// Rate Limiter

const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 100,

    message: "Too many requests, please try again later."

});


// Middlewares

app.use(cors());

app.use(helmet());

app.use(limiter);

app.use(express.json());

app.use("/uploads", express.static("uploads"));


// Routes

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);


// Test API

app.get("/", (req,res)=>{

    res.send("Job Portal Backend Running");

});


// Error Middleware

app.use(errorHandler);


// Server

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});