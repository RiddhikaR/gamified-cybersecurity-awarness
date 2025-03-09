const express=require('express');
const router=express.Router();
const {getLoginPage}=require('../controller/loginpageController.js')

router.route("/").get(getLoginPage);



module.exports=router;