const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phone, skills, education } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            skills,
            education
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user: newUser
        });

    } 
    catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}
};

// Login User
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = generateToken(user._id, user.role);

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } 
    
    catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};

const uploadResume = async(req,res)=>{

    try{
        console.log(req.file);
        const user = await User.findById(req.user.id);


        user.resume = req.file.path;


        await user.save();


        res.status(200).json({

            message:"Resume Uploaded Successfully",
            resume:user.resume

        });


    }
    
    catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};
const updateProfile = async (req,res)=>{

    try{

        const user = await User.findById(req.user.id);


        if(!user){

            return res.status(404).json({
                message:"User not found"
            });

        }


        user.name = req.body.name || user.name;

        user.phone = req.body.phone || user.phone;

        user.skills = req.body.skills || user.skills;

        user.education = req.body.education || user.education;


        await user.save();


        res.status(200).json({

            message:"Profile Updated Successfully",

            user

        });


    }
    
    catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};
const getProfile = async(req,res)=>{

    try{

        const user = await User.findById(req.user.id)
        .select("-password");


        if(!user){

            return res.status(404).json({
                message:"User not found"
            });

        }


        res.status(200).json(user);


    }
    
    catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};


module.exports = {
    registerUser,
    loginUser,
    uploadResume,
    updateProfile,
    getProfile
};