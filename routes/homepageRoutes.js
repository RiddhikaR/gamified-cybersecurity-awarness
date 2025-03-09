const express=require('express');
const router=express.Router();
const {gethome}=require('../controller/homeController.js')

router.route("/").get(gethome);



module.exports=router;