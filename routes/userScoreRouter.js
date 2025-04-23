const {saveScore,getScores}=require('../controller/userScoreController.js')
const express = require('express');

const router = express.Router();




// Route to save the score
router.route('/save-score').post(saveScore);

// Route to get the scores of a user
router.route('/get-scores/:email').get(getScores);

module.exports = router;
