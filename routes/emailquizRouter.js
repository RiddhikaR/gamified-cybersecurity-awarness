const express=require('express');
const router=express.Router();
const { getQuizPage, getQuizQuestions }=require('../controller/emailquizController.js')

router.route("/questions").get(getQuizQuestions);




module.exports=router;