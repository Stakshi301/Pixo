const {Schema,model}=require('mongoose');
const mongoose=require('mongoose');

const productSchema=new Schema({
    name:{type:String,requierd:true},
    description:{type:String,required:true},
    image:{type:String}
})

const productModel=model('productModel',productSchema);

module.exports=productModel;