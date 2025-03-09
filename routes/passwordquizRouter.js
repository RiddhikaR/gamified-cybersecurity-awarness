const express=require('express');
const router=express.Router();
const getpwdquiz=require('../controller/passwordquizController.js')

router.route("/").get(getpwdquiz);



module.exports=router;