const asyncHandler = require('express-async-handler');
const userScore = require('../model/userscore.js'); // Model to store scores
const User = require('../model/userModel.js');      // Model for user details



const saveScore = asyncHandler(async (req, res) => {
    console.log("Received data:", req.body);  // ✅ Debugging

    const { email, game, score } = req.body;

    // ✅ Validate required fields
    if (!email || !game || score === undefined || isNaN(score)) {
        console.log("❌ Invalid input:", { email, game, score });
        return res.status(400).json({ message: "Email, game, and a valid score are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ User not found:", email);
            return res.status(404).json({ message: "User not found" });
        }

        const userScoreEntry = await userScore.findOne({ email });

        if (userScoreEntry) {
            console.log("✅ Adding new score for existing user...");
            userScoreEntry.scores.push({ game, score, date: new Date() });
            await userScoreEntry.save();
        } else {
            console.log("✅ Creating new score entry...");
            const newUserScore = new userScore({
                email,
                scores: [{ game, score, date: new Date() }]
            });
            await newUserScore.save();
        }

        console.log("✅ Score saved successfully:", { email, game, score });
        res.status(200).json({ message: "Score added successfully!" });
    } catch (error) {
        console.error("❌ Error saving score:", error);
        res.status(500).json({ message: "Error saving score", error });
    }
});


// Fetch scores for a user
const getScores = asyncHandler(async (req, res) => {
    const { email } = req.params;
    console.log(email);
  
    try {
      const user = await userScore.findOne({ email });  // Look up the user score by email
  
      if (user) {
        res.status(200).json({ scores: user.scores });  // Return the scores
      } else {
        res.status(404).json({ message: 'No scores found for this user' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching scores', error });
    }
  });
  
  module.exports = { saveScore, getScores };
  
