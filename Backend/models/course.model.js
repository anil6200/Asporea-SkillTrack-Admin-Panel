const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseName: { 
        type: String, 
        required: true, 
        // enum: ['Tally Accounting', 'Customer Sales Representative', 'Retail Management',] 
    },
    courseDuration: { type: Number, required:true , default: 80 }, // in hours
    batchSize: { type: Number, required:true , default: 25 } 
});

module.exports = mongoose.model('Course', CourseSchema);