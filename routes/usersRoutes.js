const {register,current,login}=require('../controller/userController.js')
const validate=require('../middleware/verifytoken.js');
const express=require('express');
const router=express.Router();

router.route('/register').post(register)

router.route('/login').post(login)
    
router.route('/current').get(current,validate)
    
module.exports=router;  