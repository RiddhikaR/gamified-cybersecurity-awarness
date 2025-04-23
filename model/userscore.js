const mongoose=require("mongoose");

const userscore=mongoose.Schema({
    email:{type:String,required:true},
    scores: [
        {
            game: String,
            score: Number,  // Fix: changed 'scores' to 'score'
            date: { type: Date, default: Date.now }
        }
    ]
})


module.exports=mongoose.model("userscore",userscore);