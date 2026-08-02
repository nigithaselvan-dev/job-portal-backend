const express = require("express");

const router = express.Router();

const {
    createJob,
    getRecruiterJobs,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    searchJobs,
    filterJobs
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post(
    "/",
    protect,
    authorizeRoles("admin", "recruiter"),
    createJob
);

router.get("/", getAllJobs);
router.get("/search", searchJobs);
router.get("/filter", filterJobs);
router.get(
    "/recruiter/my-jobs",
    protect,
    authorizeRoles("admin", "recruiter"),
    getRecruiterJobs
);
router.get("/:id", getJobById);
router.put(
    "/:id",
    protect,
    authorizeRoles("admin", "recruiter"),
    updateJob
);

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin", "recruiter"),
    deleteJob
);

module.exports = router;