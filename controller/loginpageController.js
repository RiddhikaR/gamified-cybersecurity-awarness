const express=require('express');
const asyncHandler=require('express-async-handler');
const path = require("path");

const getLoginPage=asyncHandler( async (req,res)=>{
    res.status(200).sendFile(path.join(__dirname,"..","frontend","login.html"));
})

module.exports={getLoginPage};