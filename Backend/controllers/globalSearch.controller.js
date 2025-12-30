const Candidate = require("../models/candidate.model"); 
const Course = require("../models/course.model"); 

exports.globalSearch = async (req, res) => {
  try {
    const { q } = req.query; // Navbar se 'q' parameter milega
    
    if (!q) {
      return res.status(400).json({ message: "Bhai, search query toh bhejo!" });
    }

    
    const searchRegex = new RegExp(q, "i");           // Case-insensitive search ke liye Regex

    
    const [candidates, courses] = await Promise.all([    // Parallel search: Promise.all use karke speed badha diya
      
      Candidate.find({                                   // Candidates mein Name ya Email find kro
        $or: [
          { fullName: searchRegex },
          { emailAddress: searchRegex }
        ]
      }).select("fullName emailAddress status courseApplied"), 


      Course.find({
        courseName: searchRegex
      }).select("courseName batchSize courseDuration")
    ]);

    res.status(200).json({
      success: true,
      results: {
        candidates,
        courses,
        totalFound: candidates.length + courses.length
      }
    });
     
  } catch (err) {
    console.error("Global Search Error:", err.message);
    res.status(500).json({ message: "Search fail ho gaya bhai" });
  }
};