const express = require("express");
const router = express.Router();

const {uploadResume}=require("../controllers/userController");

const {protect}=require("../middleware/authMiddleware");

const upload=require("../middleware/uploadMiddleware");


router.put(
"/resume",
protect,
upload.single("resume"),
uploadResume
);


module.exports=router;