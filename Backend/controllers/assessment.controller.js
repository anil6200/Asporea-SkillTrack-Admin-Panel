const Assessment=require('../models/assessment.model')
const logActivity=require("../utils/logActivity")
const Candidate=require("../models/candidate.model")

exports.addAssessment = async (req, res) => {
    try {
        const { candidateId, technicalScore, softSkillScore, mockInterviewResult, remarks } = req.body;
        if (!candidateId || !technicalScore  || !softSkillScore  || !mockInterviewResult || !remarks){
            return res.status(400).json({ msg: "All fields are required" });
        } 

        
        let existing = await Assessment.findOne({ candidateId });
        if (existing) {
            return res.status(400).json({ msg: "Assessment already exists for this candidate. Use update instead." });
        }

        const newAssessment = new Assessment({
            candidateId,
            technicalScore,
            softSkillScore,
            mockInterviewResult,
            remarks
        });

        await newAssessment.save();
        const candidate=await Candidate.findById(candidateId).select("fullName")
        await logActivity(
            `Assessment added for ${candidate.fullName } `,
            "assessment"
          );
        res.status(201).json(newAssessment);
    } catch (err) {
        res.status(500).send('Server Error while adding assessment');
    }
};


exports.updateAssessment = async (req, res) => {
    try {
        const { technicalScore, softSkillScore, mockInterviewResult, remarks } = req.body;

        const updatedAssessment = await Assessment.findOneAndUpdate(
            { candidateId: req.params.candidateId }, 
            { $set: { technicalScore, softSkillScore, mockInterviewResult, remarks } },
            { new: true } 
        );          
        if (!updatedAssessment) return res.status(404).json({ msg: "Assessment record not found" });
        const candidate=await Candidate.findById(req.params.candidateId).select("fullName")
        await logActivity(
            `Assessment updated for ${candidate.fullName}`,
            "assessment"
          );
          
        res.json(updatedAssessment);
    } catch (err) {
        res.status(500).send('Server Error while updating assessment');
    }
};

exports.getAssessment = async (req, res) => {
    try {
        
        const assessment = await Assessment.findOne({ candidateId: req.params.candidateId }).populate('candidateId', ['fullName', 'courseApplied']);
        
        if (!assessment) return res.status(404).json({ msg: "No assessment found for this candidate" });
        res.json(assessment);
    } catch (err) {
        res.status(500).send('Server Error while fetching assessment');
    }
};

exports.getAllAssessments = async (req, res) => {
    try {
      const assessments = await Assessment.find()
        .populate(
          "candidateId",
          "fullName courseApplied status panchayatName"
        );
  
      res.status(200).json({
        count: assessments.length,
        data: assessments
      });
    } catch (err) {
      res.status(500).send("Server Error while fetching assessments");
    }
  };

  exports.deleteAssessment = async (req, res) => {
    try{
        await Assessment.findByIdAndDelete({candidateId:req.params.candidateId});
        res.status(200).json({msg:'Assessment Deleted'});
    }catch(err){
        res.status(500).send('Assessment deletion failed');
    }
  }
  