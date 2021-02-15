const mongoose=require('mongoose')
const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
  };
const codeSchema=new mongoose.Schema({
    title:{
     type:String,
     required:true,
    },
    code:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    creator:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    }
},opts)
module.exports=mongoose.model('Code',codeSchema)
