const path = require('path');
const asyncHandler = require('express-async-handler');
const emailquiz = require('../model/emailquizModel.js');



const getQuizQuestions = asyncHandler(async (req, res) => {
    try {
        const questions = await emailquiz.find(); // Fetch from MongoDB
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

module.exports = {  getQuizQuestions };
