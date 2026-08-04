const User = require("../models/user");

const getProfile = async(req,res)=>{

try{

const user = await User.findById(req.user.id)
.select("-password");


res.status(200).json(user);


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

if(!req.file){
return res.status(400).json({
message:"Please upload a file"
});
}


const user = await User.findById(req.user.id);


user.resume = req.file.path;


await user.save();


res.status(200).json({
message:"Resume uploaded successfully",
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



module.exports={
uploadResume,
getProfile
};