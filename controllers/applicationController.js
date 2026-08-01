const Application = require("../models/Application");
const Job = require("../models/Job");


// Apply For Job
const applyJob = async (req, res) => {

    try {

        const { jobId, coverLetter } = req.body;


        // Check job exists
        const job = await Job.findById(jobId);


        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }


        // Check duplicate application
        const existingApplication = await Application.findOne({
            student: req.user.id,
            job: jobId
        });


        if (existingApplication) {
            return res.status(400).json({
                message: "Already applied for this job"
            });
        }


        const application = await Application.create({

            student: req.user.id,
            job: jobId,
            coverLetter

        });


        res.status(201).json({

            message: "Job Applied Successfully",
            application

        });


    } catch(error) {

        res.status(500).json({
            message:error.message
        });

    }

};



// View Student Applications
const getStudentApplications = async (req,res)=>{

    try{


        const applications = await Application.find({
            student:req.user.id
        })
        .populate("job")
        .populate("student","name email");


        res.status(200).json(applications);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

// View Applicants for a Job (Admin)
const getJobApplicants = async (req, res) => {

    try {

        const applications = await Application.find({
            job: req.params.jobId
        })
        .populate("student", "name email phone skills education")
        .populate("job", "title company");


        res.status(200).json(applications);


    } catch(error) {

        res.status(500).json({
            message:error.message
        });

    }

};

// Update Application Status
const updateApplicationStatus = async (req, res) => {

    try {

        const { status } = req.body;


        const application = await Application.findByIdAndUpdate(
            req.params.id,
            {
                status
            },
            {
                new:true
            }
        );


        if(!application){

            return res.status(404).json({
                message:"Application not found"
            });

        }


        res.status(200).json({

            message:"Application Status Updated",
            application

        });


    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};


module.exports = {
    applyJob,
    getStudentApplications,
    getJobApplicants,
    updateApplicationStatus
};