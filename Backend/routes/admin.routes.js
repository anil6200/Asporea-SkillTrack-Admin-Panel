const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { loginAdmin , changePassword } = require('../controllers/admin.controller');
const authMiddleware=require("../middlewares/auth.middleware")

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
};
router.post('/login',[
    body('email')
        .isEmail().withMessage('Please Enter Valid Email (e.g. abc@gmail.com)')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password Length should be minimum 6')
], 
validateRequest, loginAdmin); 
router.put("/changePassword", authMiddleware, changePassword);
module.exports = router;