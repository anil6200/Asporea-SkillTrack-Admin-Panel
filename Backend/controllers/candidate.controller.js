const Candidate=require('../models/candidate.model');
const logActivity=require("../utils/logActivity")

exports.createCandidate=async(req,res)=>{
    try{
        const {fullName,mobileNumber,emailAddress,education,panchayatName,courseApplied,status,enrollmentFeePaid}=req.body;
        if(!fullName || !mobileNumber || !emailAddress || !education || !panchayatName || !courseApplied || !status || !enrollmentFeePaid){
            return res.status(400).json({message:"All fields are required"});
    }
    const existingCandidate = await Candidate.findOne({
        $or: [
          { mobileNumber },
          { emailAddress }
        ]
      });
  
      if (existingCandidate) {
        return res.status(409).json({
          message: "Candidate already exists with same mobile number or email"
        });
      }
        const newCandidate=new Candidate({
            fullName,
            mobileNumber,
            emailAddress,
            education,
            panchayatName,
            courseApplied,
            status,
            enrollmentFeePaid
        });
        await newCandidate.save();
        await logActivity(
            `Candidate ${newCandidate.fullName} added`,
            "candidate"
        )
        res.status(201).json({message:"Candidate created successfully",candidate:newCandidate});
    }catch(err){
        res.status(500).json({message:"Candidate creation failed",error:err.message});
    }
        }

exports.getAllCandidates=async(req,res)=>{
    try{
        const candidates=await Candidate.find();
        res.status(200).json({candidates});
    }catch(err){
        res.status(500).json({message:"Failed to fetch candidates",error:err.message});
    }
}

exports.updateCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!candidate){
            return res.status(404).json({message:"Candidate not found"})
        }
        await logActivity(
            `Candidate ${candidate.fullName} updated`,
            "candidate"
        )
        res.status(200).json(candidate);
    } catch (err) {
        res.status(500).send('Update Failed');
    }}

exports.deleteCandidate = async (req, res) => {
        try {
           const candidate= await Candidate.findByIdAndDelete(req.params.id)
           if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
          }
            await logActivity(
                `Candidate ${candidate.fullName} deleted`,
                "candidate"
            )
            res.status(200).json({ msg: 'Candidate Deleted' });
        } catch (err) {
            res.status(500).send('Delete Failed');
        }
    };