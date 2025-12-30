const express = require('express');
const router = express.Router();
const {createCandidate,getAllCandidates,updateCandidate,deleteCandidate} =require('../controllers/candidate.controller')
const authMiddleware=require('../middlewares/auth.middleware');

// Protected routes for candidate management
router.post('/addCandidate', authMiddleware,createCandidate)
router.get('/getAllCandidates',authMiddleware,getAllCandidates)
router.put('/updateCandidate/:id',authMiddleware,updateCandidate)
router.delete('/deleteCandidate/:id',authMiddleware,deleteCandidate)

module.exports=router;