const mongoose=require('mongoose');

const quizSchema=mongoose.Schema({

    
    question:{
        type:String,
        required:true

    },
    options:{
        type:[String],
        required:true
    },
    answer:{
        type:String,
        required:true
    }


})

const  emailquiz=mongoose.model("emailquiz",quizSchema);
module.exports=emailquiz;