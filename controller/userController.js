const asyncHandler = require('express-async-handler');
const User = require('../model/userModel.js');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const userModel = require('../model/userModel.js');
 const path=require('path')
const register = asyncHandler(async (req, res) => {
    const { username, email, pwd } = req.body;

    if (!username || !email || !pwd) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if (emailExists) {
        res.status(400);
        throw new Error("Email ID already registered");
    }

    if (usernameExists) {
        res.status(400);
        throw new Error("Username already taken");
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);
    console.log(`Hashed Password: ${hashedPwd}`);

    const newUser = await User.create({
        username,
        email,
        pwd: hashedPwd
    });

    if (newUser) {
        res.status(201).json({
            username: newUser.username,
            email: newUser.email
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const login = asyncHandler(async (req, res) => {
    const {email,pwd}=req.body;
    if(!email||!pwd){
        res.status(200);
        throw new Error("all fields are mandatory")
    }
    const enteredEMAIL=await userModel.findOne({email})
    if(enteredEMAIL && (await bcrypt.compare(pwd,enteredEMAIL.pwd))){
        const accessToken=jwt.sign(
            {
                enteredEmail:{
                    username:enteredEMAIL.username,
                    id:enteredEMAIL.id
                },
            },process.env.ACCESS_TOKEN,{expiresIn:"1m"}
        )
        res.status(200).json({accessToken})
    }
   
});

const current = asyncHandler(async (req, res) => {
    res.redirect("/thirdPage.html");
});

module.exports = { register, login, current };
