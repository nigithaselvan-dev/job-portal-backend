const Job = require("../models/Job");

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
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecruiterJobs = async (req, res) => {

    try {

        const jobs = await Job.find({
            recruiter: req.user.id
        }).sort({
            createdAt: -1
        });


        res.status(200).json(jobs);


    } catch(error) {

        res.status(500).json({
            message:error.message
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


    } catch(error) {

        res.status(500).json({
            message:error.message
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

    } catch (error) {

        res.status(500).json({
            message: error.message
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

    } catch (error) {

        res.status(500).json({
            message: error.message
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

    } catch (error) {

        res.status(500).json({
            message: error.message
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


    }catch(error){

        res.status(500).json({
            message:error.message
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

    } catch (error) {

        res.status(500).json({
            message: error.message
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