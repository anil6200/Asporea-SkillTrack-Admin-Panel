const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
        required: true
    },
    technicalScore: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    softSkillScore: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    mockInterviewResult: {
        type: String,
        enum: ["Pass", "Fail"],
        required: true
    },
    remarks: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Assessment", assessmentSchema);
