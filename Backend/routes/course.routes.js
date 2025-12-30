const express = require('express');
const router = express.Router();
const {createCourse, getAllCourses, updateCourse, deleteCourse} = require('../controllers/course.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Protected routes for course management

router.post('/addCourse', authMiddleware, createCourse);
router.get('/getAllCourses', authMiddleware, getAllCourses);
router.put('/updateCourse/:id', authMiddleware, updateCourse);
router.delete('/deleteCourse/:id', authMiddleware, deleteCourse);

module.exports = router;