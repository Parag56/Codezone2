const User=require('../models/User')
const { validationResult } = require('express-validator')
const HttpError=require('../models/Http-error')
//signup handler
const signup=async (req,res,next)=>{
const errors = validationResult(req)
if (!errors.isEmpty()) {
    return next(new HttpError('invalid inputs passed,please check your data', 422))
}
const {name,email,password}=req.body
let existinguser;
try{
    existinguser=await User.findOne({email})
}catch(err){
const error=new HttpError('Signup failed,Please try again later',500)
return next(error)
}
if(existinguser){
    const error=new HttpError('User already exists,Please login instead',422)
    return next(error)
}
const newuser=new User({
    name,
    email,
    password,
    codes:[]
})
try {
    await newuser.save()
} catch (err) {
    const error = new HttpError('Signing up failed,please try again later', 500)
    return next(error)
}
res.status(201).json({ user: newuser.toObject({ getters: true }) })
}
//login handler
const login=async (req,res,next)=>{
const {email,password}=req.body
let existingUser
    try {
        existingUser = await User.findOne({ email })
    } catch (err) {
        const error = new HttpError('Logging in failed,please try later', 500)
        return next(error)
    }
    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError('Invalid credentials,could not log you in', 401)
        return next(error)
    }
    res.json({ message: 'Logged in!' })
}
module.exports={
    signup,
    login
}