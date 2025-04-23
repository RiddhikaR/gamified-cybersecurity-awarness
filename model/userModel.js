const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    
    username:{
        type:String,
        required:[true,"please enter your name"],
        unique:[true,"username already exits"]
    },
    email:{
        type:String,
        required:[true,"please enter your email id"],
        unique:[true,"email id already exits"]

    },
    pwd:{
        type:String,
        required:[true,"please enter a secure password"]
    }
},{
    timestamps:true,
})

module.exports=mongoose.model("user",userSchema);