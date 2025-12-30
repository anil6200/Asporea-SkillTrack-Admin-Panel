const express = require('express');
const router = express.Router();
const {addAssessment, updateAssessment, getAssessment , getAllAssessments , deleteAssessment} = require('../controllers/assessment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Protected routes for Assessment management

router.post('/addAssessment', authMiddleware, addAssessment);
router.put('/updateAssessment/:candidateId', authMiddleware, updateAssessment);
router.get('/getAssessment/:candidateId', authMiddleware, getAssessment);
router.get('/getAllAssessments',authMiddleware, getAllAssessments);
router.delete('/deleteAssessment/:candidateId', authMiddleware, deleteAssessment);

module.exports = router;