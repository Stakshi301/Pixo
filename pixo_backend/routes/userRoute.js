const express=require('express');
const route=express.Router();
const { signIn, logIn }=require('../controller/userController');

route.post('/signIn',signIn);

route.post('/logIn',logIn);

module.exports=route;