const express = require("express");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const User = require("../models/User");
const router= express.Router();


router.post("/register", async (req, res)=>{
try{
const {username, email, password,phone,address} = req.body;
const hashPassword = await bcrypt.hash (password, 10);
const newUser = new User({username, email, password: hashPassword ,phone,address}); 
await newUser.save();
res.json({ message: "User Registered" });
}catch(error){
    res.json({message: error.message})
}
});


router.post("/login", async (req, res)=>{
    try{
    const {email, password} = req.body;
    
    const User = await User.findOne({email}); 
    if(!user||!await bcrypt.compare(password,user.password)){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn: "1h"
    })
    res.json({ token});
    }catch(error){
        res.json({message: error.message})
    }
    });
    
module.exports = router;