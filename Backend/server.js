const express = require("express");
const app = express();
const cors = require("cors");
const MongoConnect = require("./config/Mongo");
const adminRoutes = require("./routes/admin.routes");
const courseRoutes = require("./routes/course.routes");
const candidateRoutes = require("./routes/candidate.routes");
const assessmentRoutes = require("./routes/assessment.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const globalSearch=require("./routes/globalSearch.routes")

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/search",globalSearch)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  MongoConnect();
});

app.get("/", (req, res) => {
    res.send("Server is running...");
})