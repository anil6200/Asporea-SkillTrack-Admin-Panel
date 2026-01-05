const Candidate = require("../models/candidate.model");
const Course = require("../models/course.model");
const Assessment = require("../models/assessment.model");
const Activity = require("../models/activity.model")

exports.getDashboardStats = async (req, res) => {
  try {
    const totalCandidates = await Candidate.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalAssessments = await Assessment.countDocuments();

    const appliedCandidates = await Candidate.countDocuments({ status: "applied" });
    const trainingCandidates = await Candidate.countDocuments({ status: "training" });
    const placedCandidates = await Candidate.countDocuments({ status: "placed" });

    let recentActivities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("message createdAt");
    if (recentActivities.length === 0) {
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
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 13);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // total 7 days including today

    const trends = await Candidate.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1
        }
      }
    ]);

    const trendMap = {};

    trends.forEach(item => {
      const key = `${item._id.year}-${item._id.month}-${item._id.day}`;
      trendMap[key] = item.count;
    });


    const enrollmentTrends = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      enrollmentTrends.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        count: trendMap[key] || 0
      });
    }



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
    console.error("Dashboard stats error:", err.message)
    res.status(500).json({ message: "Dashboard stats failed" });
  }
};

