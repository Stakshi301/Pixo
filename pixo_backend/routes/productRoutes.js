const express = require('express');
const router = express.Router();
const {getProducts,postProduct,postMany,putProduct,deleteProduct,deleteMany}=require('../controller/productController');

router.get('/',getProducts);

router.post('/post',postProduct);

router.post('/postMany',postMany);

router.put('/put/:id',putProduct);

router.delete('/delete/:id',deleteProduct); 

router.delete('/deleteMany',deleteMany); 
module.exports=router;

 