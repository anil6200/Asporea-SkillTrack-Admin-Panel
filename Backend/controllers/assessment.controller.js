const Assessment = require("../models/assessment.model");
const Candidate = require("../models/candidate.model");
const logActivity = require("../utils/logActivity");


exports.addAssessment = async (req, res) => {
  try {
    const {
      candidateId,
      technicalScore,
      softSkillScore,
      mockInterviewResult,
      remarks,
    } = req.body;


    if (
      !candidateId ||
      technicalScore === undefined ||
      softSkillScore === undefined ||
      !mockInterviewResult ||
      !remarks
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }


    const existing = await Assessment.findOne({ candidateId });
    if (existing) {
      return res.status(409).json({
        msg: "Assessment already exists for this candidate. Use update instead.",
      });
    }

    const newAssessment = new Assessment({
      candidateId,
      technicalScore,
      softSkillScore,
      mockInterviewResult,
      remarks,
    });

    await newAssessment.save();


    const candidate = await Candidate.findById(candidateId).select("fullName");
    const name = candidate ? candidate.fullName : "Candidate";

    await logActivity(
      `Assessment added for ${name}`,
      "assessment"
    );

    res.status(201).json(newAssessment);
  } catch (err) {
    res.status(500).send("Server Error while adding assessment");
  }
};

exports.updateAssessment = async (req, res) => {
  try {
    const {
      technicalScore,
      softSkillScore,
      mockInterviewResult,
      remarks,
    } = req.body;

    const updatedAssessment = await Assessment.findOneAndUpdate(
      { candidateId: req.params.candidateId },
      {
        $set: {
          technicalScore,
          softSkillScore,
          mockInterviewResult,
          remarks,
        },
      },
      { new: true }
    );

    if (!updatedAssessment) {
      return res.status(404).json({ msg: "Assessment record not found" });
    }

    const candidate = await Candidate.findById(
      req.params.candidateId
    ).select("fullName");

    const name = candidate ? candidate.fullName : "Candidate";

    await logActivity(
      `Assessment updated for ${name}`,
      "assessment"
    );

    res.status(200).json(updatedAssessment);
  } catch (err) {
    res.status(500).send("Server Error while updating assessment");
  }
};


exports.getAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      candidateId: req.params.candidateId,
    }).populate("candidateId", ["fullName", "courseApplied"]);

    if (!assessment) {
      return res
        .status(404)
        .json({ msg: "No assessment found for this candidate" });
    }

    res.status(200).json(assessment);
  } catch (err) {
    res.status(500).send("Server Error while fetching assessment");
  }
};

exports.getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find().populate(
      "candidateId",
      "fullName courseApplied status panchayatName"
    );

    res.status(200).json({
      count: assessments.length,
      data: assessments,
    });
  } catch (err) {
    res.status(500).send("Server Error while fetching assessments");
  }
};


exports.deleteAssessment = async (req, res) => {
  try {

    const deleted = await Assessment.findOneAndDelete({
      candidateId: req.params.candidateId,
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Assessment not found" });
    }

    await logActivity(
      "Assessment deleted",
      "assessment"
    );

    res.status(200).json({ msg: "Assessment Deleted" });
  } catch (err) {
    res.status(500).send("Assessment deletion failed");
  }
};