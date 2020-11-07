const mongoose=require('mongoose')
const mongooseValidator=require('mongoose-unique-validator')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    codes:[
        {
            type:mongoose.Types.ObjectId,
            required:true,
            ref:'Code'
        }
    ]
})
userSchema.plugin(mongooseValidator)
module.exports=mongoose.model('User',userSchema)