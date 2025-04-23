const express=require('express');
const asyncHandler=require('express-async-handler');

const getpwdquiz=asyncHandler( async (req,res)=>{
    res.status(200).json({message:"password quiz page"});
})

module.exports=getpwdquiz;