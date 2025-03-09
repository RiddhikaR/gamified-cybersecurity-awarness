const express=require('express');
const router=express.Router();
const { getQuizPage, getQuizQuestions }=require('../controller/emailquizController.js')

router.route("/questions").get(getQuizQuestions);
router.route("/").get(getQuizPage);



module.exports=router;