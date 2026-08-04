const Job = require("../models/Job");
const Application = require("../models/Application");
// Create Job
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      jobType,
      description,
      requirements,
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      jobType,
      description,
      requirements,
      recruiter: req.user.id,
    });

    res.status(201).json({
      message: "Job Created Successfully",
      job,
    });
  } 
  
  catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}
};

const getRecruiterJobs = async (req, res) => {

    try {

        const jobs = await Job.find({
            recruiter: req.user.id
        })
        .sort({
            createdAt: -1
        });


        const jobsWithApplicants = await Promise.all(

            jobs.map(async(job)=>{


                const applicantCount = await Application.countDocuments({
                    job: job._id
                });


                return {
                    ...job.toObject(),
                    applicantCount
                };


            })

        );


        res.status(200).json(jobsWithApplicants);


    } 
    
    catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};

// Get All Jobs with Pagination
const getAllJobs = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;


        const skip = (page - 1) * limit;


        const totalJobs = await Job.countDocuments();


        const jobs = await Job.find()
            .populate("recruiter", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);



        res.status(200).json({

            currentPage: page,

            totalJobs,

            totalPages: Math.ceil(totalJobs / limit),

            jobs

        });


    } 
    
    catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};
// Get Single Job
const getJobById = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id)
            .populate("recruiter", "name email");

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json(job);

    } 
    
    catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};
// Update Job
const updateJob = async (req, res) => {

    try {

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedJob) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job Updated Successfully",
            job: updatedJob
        });

    } 
    
    catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};
// Delete Job
const deleteJob = async (req, res) => {

    try {

        const deletedJob = await Job.findByIdAndDelete(req.params.id);

        if (!deletedJob) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job Deleted Successfully"
        });

    } 
    
    catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};
const searchJobs = async(req,res)=>{

    try{

        const { keyword } = req.query;


        const jobs = await Job.find({

            $or:[

                {
                    title:{
                        $regex: keyword,
                        $options:"i"
                    }
                },

                {
                    company:{
                        $regex: keyword,
                        $options:"i"
                    }
                },

                {
                    description:{
                        $regex: keyword,
                        $options:"i"
                    }
                }

            ]

        });


        res.status(200).json({

            count: jobs.length,

            jobs

        });


    }
    catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};
// Filter Jobs
const filterJobs = async (req, res) => {

    try {

        const { location, jobType } = req.query;

        const filter = {};

        if (location) {
            filter.location = location;
        }

        if (jobType) {
            filter.jobType = jobType;
        }

        const jobs = await Job.find(filter);

        res.status(200).json({
            count: jobs.length,
            jobs
        });

    }catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

};



module.exports = {
    createJob,
    getRecruiterJobs,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    searchJobs,
    filterJobs
};