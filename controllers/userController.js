const User = require("../models/User");


const uploadResume = async(req,res)=>{

try{


const user = await User.findById(req.user.id);


user.resume = req.file.path;


await user.save();


res.status(200).json({

message:"Resume uploaded successfully",
resume:user.resume

});


}
catch(error){

res.status(500).json({
message:error.message
});

}


};


module.exports={
uploadResume
};