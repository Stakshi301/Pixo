const express =require('express');
const productModel=require('../model/productSchema');

//get products
const getProducts=async(req,res)=>{
    try{
        const getProduct=await productModel.find();
        res.status(200).json(getProduct);
    }catch(err){
        res.status(500).json(err.message);
    }
}

//Post single product
const postProduct = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const newProduct = new productModel({ name, description, image });
        await newProduct.save();
        res.json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



//post Many
const postMany=async(req,res)=>{
    try{
       if(!Array.isArray(req.body)){
        return res.status(400).json({ message: "Request body should be an array of products." });
       }
       const newProduct = await productModel.insertMany(req.body);
        res.json({message:"Product added!!",newProduct});
    }catch(err){
        res.status(500).json(err.message);
    }
}


//putProduct
const putProduct=async(req,res)=>{
    try{
        const updateProduct=await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updateProduct){
            res.json('Product not found');
        } 
        res.json(updateProduct);
        res.json('Product updated seccessfully'); 
    }catch(err){ 
        res.status(500).json(err.message);
    } 
}



//delete single Product
const deleteProduct=async(req,res)=>{
    try{
        const deleteProduct=await productModel.findByIdAndDelete(req.params.id);
        if(!deleteProduct){
            res.json('Product not found');
        }
        res.json('Product deleted successfully');
    }catch(err){
        res.json(err.message);
    }
}


//deleteMany
const deleteMany=async(req,res)=>{
    try{
        const deleteMany=await productModel.deleteMany({});
        res.json({ message: "All products deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports={getProducts,postProduct,postMany,putProduct,deleteProduct,deleteMany}