const express = require("express");

const router = express.Router();


const {
    applyJob,
    getStudentApplications,
    getJobApplicants,
    updateApplicationStatus
} = require("../controllers/applicationController");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const { protect } = require("../middleware/authMiddleware");


// Student Apply Job
router.post(
    "/",
    protect,
    applyJob
);


// Student View Applications
router.get(
    "/student",
    protect,
    getStudentApplications
);

// Admin View Applicants
router.get(
    "/job/:jobId",
    protect,
    authorizeRoles("admin", "recruiter"),
    getJobApplicants
);


// Admin Accept/Reject Application
router.put(
    "/:id",
    protect,
    authorizeRoles("admin", "recruiter"),
    updateApplicationStatus
);

module.exports = router;