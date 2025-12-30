const express = require('express');
const router = express.Router();
const getDashboardStats = require('../controllers/dashBoard.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.get('/getDashBoardStats', authMiddleware, getDashboardStats.getDashboardStats);

module.exports = router;