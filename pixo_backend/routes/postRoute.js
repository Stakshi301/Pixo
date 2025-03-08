const express=require('express')
const route=express.Router();
const {createPost,getAllPost,specificPost,updatePost,deletePost,searchPost}=require('../controller/postController');
const auth = require("../middleware/AuthMiddleware");

route.post("/createPost", auth, createPost);
route.get("/getAllPost", getAllPost);
route.get("/my-posts", auth, specificPost);
route.put("/update/:id", auth, updatePost);
route.delete("/delete/:id", auth, deletePost);
route.get("/search", searchPost);

module.exports=route;