const postModel = require('../model/postSchema');
const userModel = require('../model/userSchema');


//create post
const createPost=async(req,res)=>{
    try{
        const {name,description,image}=req.body;
        const newPost=new postModel({userId:req.user.userId,name,description,image});
        await newPost.save();
        res.status(201).json({ message: "Post created successfully!", post: newPost });
    }catch(err){
        res.status(500).json({ message: "Server Error!" });
    }
}

//get all post
const getAllPost=async(req,res)=>{
    try{
        const getAllPost=await postModel.find().populate('userId','name');
        res.json(getAllPost)
    } catch (error) {
        res.status(500).json({ message: "Server Error!" });
        console.log(error);
      }
}


//get user specific post 
const specificPost=async(req,res)=>{
    try{
        const specificPost=await postModel.find({userId:req.user.userId});
        res.json(specificPost);
    } catch (error) {
        res.status(500).json({ message: "Server Error!" });
      }
}

//update post only owner
const updatePost=async(req,res)=>{
    try{
        const updatePost=await postModel.findById(req.params.id);
        if(!updatePost) return res.status(404).json({ message: "Post not found!" });

        if(updatePost.userId.toString() !== req.user.userId) return res.status(403).json({ message: "Unauthorized! You can update only your posts." });

        const updatedPost = await postModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json({message:'Post updated',post:updatedPost});
    }catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
} 


//delete post 
const deletePost=async(req,res)=>{
    try{
        const deletepost=await postModel.findById(req.params.id);
        if(!deletepost)return res.status(404).json({message:'Post not found'});

        if(deletepost.userId.toString()!==req.user.userId && req.user.role!=='admin')
            return res.status(403).json({ message: "Unauthorized! You can delete only your posts." });

        await postModel.findByIdAndDelete(req.params.id);
        res.json({message:'Post deleted'});
    }catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
}


//search image by name
const searchPost=async(req,res)=>{
    try{
        const {query}=req.query;
        const post=await postModel.find({ name: { $regex: query, $options: "i" }});
        res.json(post);
    } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
}

module.exports={createPost,getAllPost,specificPost,updatePost,deletePost,searchPost}