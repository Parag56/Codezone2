const User = require("../models/User");
const { validationResult } = require("express-validator");
const HttpError = require("../models/Http-error");
const bcrypt = require("bcryptjs");
const PendingUser=require('../models/PendingUsers')
const jwt = require("jsonwebtoken");
//signup handler
const signup = async (req, res, next) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return next(new HttpError("Invalid inputs passed,please check your data",422))
    }
    const {name,email,password}=req.body
    try{
    existinguser=await User.findOne({email})
    pendinguser=await PendingUser.findOne({email})
    }catch(err){
    const error=new HttpError('Signup failed,please try again later',500)
    return next(error)
    }
    if(existinguser||pendinguser){
        const error=new HttpError('User is already registered,Please login instead',422)
        return next(error)
    }
    let hashedpassword;
    try{
    hashedpassword=await bcrypt.hash(password,8)
    }catch(err){
        const error = new HttpError("Could not create user,try again later", 500);
        return next(error);
    }
    const newpendinguser = new PendingUser({
        name,
        email,
        password: hashedpassword,
      });
    try{
    await newpendinguser.save();
    var api_key = process.env.EMAIL_KEY;
    var domain = 'geeksmanjcbust.in';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
    let hash=newpendinguser._id 
    console.log(hash)
    var data = {
      from: '<cedept@geeksmanjcbust.in>',
      to: newpendinguser.email,
      subject: 'Thanks for Registering',
      html:  `<h2>Hi  ${newpendinguser.name}</h2>
        <p>Thanks for getting started with GeeksCode by Geeksman-The Coding Society!We need a little more information 
        to complete your registration, including a confirmation of your email address. Click below to confirm your email address:
        <a href="${process.env.BACKEND_URL}activate/user/${hash}">link</a> If you have problems, please paste the above URL into your web browser.</p>`
    };
     
    mailgun.messages().send(data, function (error, body) {
      if(error)
      {
        console.log(error);
      }
      console.log(body);
    });
      return  res.json({message:'You have been registered,check your email address'})
    }catch(err){
        const error = new HttpError(
            "Signing up failed,please try again later",
            500
          );
          return next(error);
    }   
};
//login handler
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Logging in failed,please try later", 500);
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials,could not log you in",
      401
    );
    return next(error);
  }
  let isvalidpasword = false;
  try {
    isvalidpasword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "could not log you in, please check your credentials and try again",
      500
    );
    return next(error);
  }
  if (!isvalidpasword) {
    const error = new HttpError(
      "could not log you in, please check your credentials and try again",
      500
    );
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userdId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed,please try again later",
      500
    );
    return next(error);
  }
  res.status(201).json({
    userid: existingUser.id,
    email: existingUser.email,
    username: existingUser.name,
    token,
  });
};
const getuser = async (req,res,next)=>{
  const uid = req.params.uid;
  let user;
  try {
    user = await User.findById(uid);
  } catch (e) {
    const error = new HttpError(
      "Something went wrong could not fetch the codes,please try again later",
      500
    );
    return next(error);
  }
  if (!user)
    return next(new HttpError("Could not find a user with that id", 404));
  res.status(200).json({ user: user.toObject({ getters: true }) });
};
const verifyuser=async (req,res,next)=>{
  let hash=req.params.hash
    try{
      const user=await PendingUser.findOne({_id:hash})
      const {name,email,password}=user
      if(!user){
        return res.status(422).send('User cannot be verified')
      }
      let newuser=new User({
        name,
        email,
        password
      })
      try{
        await newuser.save()
        await user.remove()
      }catch(e){
        res.json({error:e})
      }
      res.render('verification',{name})
    }catch(e){
      res.json({message:'Could not verify you please try again later'})
    }
}
const forgotpassword = async (req, res, next) => {
  try {
    const email = req.body;
    const thisuser = await User.findOne({ email });
    if (thisuser) {
      var api_key = process.env.EMAIL_KEY;
      var domain = "geeksmanjcbust.in";
      var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });
      let hash = thisuser._id;
      var data = {
        from: "<cedept@geeksmanjcbust.in>",
        to: thisuser.email,
        subject: "Reset Password",
        html: `<h2>Hi ${thisuser.name}</h2>
     <p>We got a request for changing your password at GeeksCode by Geeksman-The Coding Society!</p>
      <p>Click below to change your password <a href="${process.env.BACKEND_URL}changepassword/${hash}">Link</a></p> 
      <p>If you have problems, please paste the above URL into your web browser. DONT CLICK THE LINK IF YOU HAVE NOT PLACED THIS REQUEST!!</p>`,
      };
      mailgun.messages().send(data, function (error, body) {
        if (error) {
          console.log(error);
        }
        console.log(body);
      });
      return res.json({
        message:
          "Your request for password change has been initiated,please check your email",
      });
    } else {
      return res.status(500).json({ error: "User Not found!" });
    }
  } catch (err) {
    return res.status(404).json({ error: error });
  }
};
const resetpassword=async (req,res,next)=>{
  try{
    const {password,id}=req.body
    const thisuser=await User.findById(id);
    if(!thisuser){
      return res.status(422).json({message:'User does not exists'})
    }
    let hashedpassword;
    if(thisuser)
    {  hashedpassword=await bcrypt.hash(password,8)
       thisuser.password=hashedpassword
       await thisuser.save(); 
     return  res.status(200).json({message:"password reset successfully"})  
    }
    else
    {
    return res.status(500).json({"error":"User Not found!"}) 
    }
   }
 catch(error)
 {
  return  res.status(404).json({"error":'this is one error'}) 
 }
}
const getcodes=async (req,res,next)=>{
  const userid=req.params.id
  let usercodes;
  try{
    usercodes=await User.findById(userid).populate('codes')
  }catch(err){
    return res.status(500).json({err})
  }
  if(!usercodes||usercodes.codes.length===0){
    return res.status(404).json({message:'There are no codes currently available'})
  }
  return res.status(200).json({data:usercodes.codes})
   
}
module.exports = {
  signup,
  login,
  getuser,
  forgotpassword,
  resetpassword,
  verifyuser,
  getcodes
};
