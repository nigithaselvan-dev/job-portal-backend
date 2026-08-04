const express = require("express");
const router = express.Router();

const {
uploadResume,
getProfile
}=require("../controllers/userController");

const {protect}=require("../middleware/authMiddleware");

const upload=require("../middleware/uploadMiddleware");


router.put(
"/resume",
protect,
upload.single("resume"),
uploadResume
);

router.get(
"/profile",
protect,
getProfile
);

module.exports=router;