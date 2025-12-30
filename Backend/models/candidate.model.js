const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  panchayatName: {
    type: String,
    required: true
  },
  courseApplied: {
    type: String,
    enum: ["Tally Accounting", "Customer Sales Representative", "Retail Management"],
    required: true
  },
  status: {
    type: String,
    enum: ["applied", "training", "placed"],
    default: "Applied"
  },
  enrollmentFeePaid:{type:Boolean,default:false}
}, { timestamps: true });

module.exports = mongoose.model("Candidate", candidateSchema);
