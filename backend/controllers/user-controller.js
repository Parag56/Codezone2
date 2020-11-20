const User = require("../models/User");
const { validationResult } = require("express-validator");
const HttpError = require("../models/Http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//signup handler
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("invalid inputs passed,please check your data", 422)
    );
  }
  const { name, email, password } = req.body;
  let existinguser;
  try {
    existinguser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Signup failed,Please try again later", 500);
    return next(error);
  }
  if (existinguser) {
    const error = new HttpError(
      "User already exists,Please login instead",
      422
    );
    return next(error);
  }
  let hashedpassword;
  try {
    hashedpassword = await bcrypt.hash(password, 8);
  } catch (err) {
    const error = new HttpError("Could not create user,try again later", 500);
    return next(error);
  }
  const newuser = new User({
    name,
    email,
    password: hashedpassword,
    codes: [],
  });
  try {
    await newuser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed,please try again later",
      500
    );
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userdId: newuser.id, email: newuser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed,please try again later",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userid: newuser.id, email: newuser.email,username:newuser.name, token: token });
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
  res
    .status(201)
    .json({
     userid:existingUser.id,
     email:existingUser.email,
     username:existingUser.name,
     token
    });
};
const getuser = async (req, res, next) => {
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
module.exports = {
  signup,
  login,
  getuser,
};
