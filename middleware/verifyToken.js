const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');

const validate=asyncHandler(async(req,res,next)=>{
    let authheader=req.headers.authorization;
    if(authheader && authheader.startsWith("Bearer")){
        let token=authheader.split("")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("invalid token");
            }
            req.user=decoded.user;
            next();
        })
    }
})

module.exports=validate;