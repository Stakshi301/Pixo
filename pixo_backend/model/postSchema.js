const mongoose=require('mongoose');
const {Schema,model}=require('mongoose');

const postSchema=new Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    name:{type:String,required:true},
    description:{type:String},
    image:{type:String,required:true},
    createAt:{type:Date,default:Date.now}

})

const postModel=model('postModel',postSchema);

module.exports=postModel;