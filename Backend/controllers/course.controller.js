const Course = require("../models/course.model");

exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDuration, batchSize } = req.body;
        if (!courseName || !courseDuration || !batchSize) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newCourse = new Course({
            courseName,
            courseDuration,
            batchSize
        });
        await newCourse.save();
        res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (err) {
        res.status(500).json({ message: "Course creation failed", error: err.message });
    }
}

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ courses });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch courses", error: err.message });
    }
}

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: "Course update failed", error: err.message });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'Course Deleted' });
    } catch (err) {
        res.status(500).json({ message: "Course deletion failed", error: err.message });
    }
}
