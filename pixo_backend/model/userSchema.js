const mongoose=require('mongoose');
const {Schema,model}=require('mongoose');

const userSchema=new Schema({
    name:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String ,enum:['user','admin'],default:'user'},
})

const userModel=model('user',userSchema);

module.exports=userModel;