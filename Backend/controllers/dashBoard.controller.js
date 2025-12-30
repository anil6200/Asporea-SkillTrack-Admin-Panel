const Candidate = require("../models/candidate.model");
const Course = require("../models/course.model");
const Assessment = require("../models/assessment.model");
const Activity=require("../models/activity.model")

exports.getDashboardStats = async (req, res) => {
  try {
    const totalCandidates = await Candidate.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalAssessments = await Assessment.countDocuments();

    const appliedCandidates = await Candidate.countDocuments({ status: "applied" });
    const trainingCandidates = await Candidate.countDocuments({ status: "training" });
    const placedCandidates = await Candidate.countDocuments({ status: "placed" });

    let recentActivities=await Activity.find()
    .sort({createdAt:-1})
    .limit(5)
    .select("message createdAt");
    if(recentActivities.length===0){
      const recentCandidates = await Candidate.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("fullName createdAt");

    const recentAssessments = await Assessment.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("candidateId", "fullName");

     recentActivities = [
      ...recentCandidates.map(c => ({
        message: `Candidate ${c.fullName} added`,
        time: c.createdAt,
      })),
      ...recentAssessments.map(a => ({
        message: `Assessment updated for ${a.candidateId.fullName}`,
        time: a.createdAt,
      })),
    ].sort((a, b) => new Date(b.time) - new Date(a.time)); 

    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const trends = await Candidate.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } }, // Pichle 7 din ka data
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const enrollmentTrends = trends.map(item => ({       // format for  graph like {day:'Mon',count: anynumber}
      day: new Date(item._id).toLocaleDateString('en-US', { weekday: 'short' }),
      count: item.count
    }));
   

    res.status(200).json({
      totalCandidates,
      totalCourses,
      totalAssessments,
      appliedCandidates,
      trainingCandidates,
      placedCandidates,
      recentActivities,
      enrollmentTrends
    });
  } catch (err) {
    console.error("Dashboard stats error:",err.message)
    res.status(500).json({ message: "Dashboard stats failed" });
  }
};

