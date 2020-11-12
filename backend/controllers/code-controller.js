const { validationResult } = require('express-validator')
const HttpError = require('../models/Http-error')
const Code = require('../models/Code')
const User = require('../models/User')
const mongoose = require('mongoose')

//getting codes handler
const getcodesusingUserId =async (req, res, next) => {
const userId=req.params.uid
let codes;
try{
     codes=await Code.find({creator:userId})
}catch(err){
const error=new HttpError('Something went wrong could not fetch the codes,please try again later',500)
return next(error)
}
if(codes.length==0){
    return next(new HttpError('could not find a code for that user id',404))
}
res.status(200).json({codes:codes.map(code=>code.toObject({getters:true}))})
}

//creating codes handler
const createCodes = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new HttpError('invalid inputs passed,please check your data', 422)
    }
    const { title, code, creator } = req.body
    const newCode = new Code({
        title,
        code,
        creator
    })
    let user;
    try {
        user = await User.findById(creator)
    } catch (err) {
        const error = new HttpError('Could not save the code,please try again later ', 500)
        return next(error)
    }
    if (!user) {
        const error = new HttpError('Could not find a user with that id', 404)
        return next(error)
    }
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await newCode.save({ session: sess })
        user.codes.push(newCode)
        await user.save({ session: sess })
        await sess.commitTransaction()
    } catch (err) {
        const error=new HttpError('Could not save the code,please try again later ',500)
        return next(error)
    }
    res.status(201).json({code:newCode.toObject({ getters: true })})
}

//delete code handler
const deleteCodes = async (req, res, next) => {
const codeId=req.params.cid
let code;
try{
code=await Code.findById(codeId).populate('creator')
}catch(err){
const error=new HttpError('Something went wrong, could not delete the code,please try again later',500)
return next(error)
}
if(!code){
    return next(new HttpError('We could not find a code for this id',404))
}
try{
const sess=await mongoose.startSession();
sess.startTransaction()
await code.remove({session:sess})
code.creator.codes.pull(code)
await code.creator.save({session:sess})
}catch(err){
const error=new HttpError('Something went wrong could not delete the code',500)
return next(error)
}
res.json({message:'Code deleted successfully'})
}
module.exports = {
    getcodesusingUserId,
    createCodes,
    deleteCodes
}