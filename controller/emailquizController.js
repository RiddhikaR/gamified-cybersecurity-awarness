const path = require('path');
const asyncHandler = require('express-async-handler');
const emailquiz = require('../model/emailquizModel.js');

const getQuizPage = asyncHandler(async (req, res) => {
    try {
        res.status(200).sendFile(path.join(__dirname, '../frontend/game1Quiz.html'));
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

const getQuizQuestions = asyncHandler(async (req, res) => {
    try {
        const questions = await emailquiz.find(); // Fetch from MongoDB
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

module.exports = { getQuizPage, getQuizQuestions };
