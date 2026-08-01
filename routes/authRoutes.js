const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    uploadResume,
    updateProfile,
    getProfile
} = require("../controllers/authController");


const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");



router.post("/register", registerUser);


router.post("/login", loginUser);


router.post(
    "/upload-resume",
    protect,
    upload.single("resume"),
    uploadResume
);

// Get Profile
router.get(
    "/profile",
    protect,
    getProfile
);


// Update Profile
router.put(
    "/profile",
    protect,
    updateProfile
);


module.exports = router;