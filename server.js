require("dotenv").config();  // Load environment variables at the top
const cors=require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path=require('path');
const PORT = process.env.PORT || 3000;

const emailquiz = require('./model/emailquizModel.js');
const predefinedQuestions = require('./data/questions.js');

// ✅ Use process.env.CONNECTION properly
mongoose.connect(process.env.CONNECTION)
.then(async () => {
    console.log("✅ Connected to MongoDB Atlas");

    // Check if questions exist before inserting
    const count = await emailquiz.countDocuments();
    if (count === 0) {
        await emailquiz.insertMany(predefinedQuestions);
        console.log("✅ Predefined questions inserted into database");
    } else {
        console.log("ℹ️ Questions already exist in database");
    }
})
.catch(error => console.error("❌ MongoDB connection error:", error));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "front_page.html"));
  });


app.use("/homepage",require("./routes/homepageRoutes.js"))
app.use("/loginpage",require("./routes/loginPageRouter.js"))
app.use("/game1/quiz/user",require("./routes/usersRoutes.js"))
app.use("/game1/quiz", require('./routes/emailquizRouter.js'));
app.use("/game2/password", require('./routes/passwordquizRouter.js'));
app.use("/game1/score",require('./routes/userScoreRouter.js'));

app.listen(PORT, () => {
    console.log(`🚀 App running on port ${PORT}`);
});
