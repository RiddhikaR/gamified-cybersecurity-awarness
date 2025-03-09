const express=require('express');
const asyncHandler=require('express-async-handler');
const path = require("path");

const gethome=asyncHandler( async (req,res)=>{
    res.status(200).sendFile(path.join(__dirname,"..","frontend","front_page.html"));
})

module.exports={gethome};