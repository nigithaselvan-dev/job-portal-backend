const express = require("express");

const router = express.Router();

const {
    createJob,
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
    authorizeRoles("admin"),
    createJob
);

router.get("/", getAllJobs);
router.get("/search", searchJobs);
router.get("/filter", filterJobs);
router.get("/:id", getJobById);

router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    updateJob
);

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteJob
);

module.exports = router;