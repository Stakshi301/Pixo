require ('dotenv').config();
const express=require('express');
const connectDB=require('./config/db');
const ProductRoute=require('./routes/productRoutes');
const userRoute=require('./routes/userRoute');
const postRoute=require('./routes/postRoute')
const cors=require('cors');
const path =require ('path');

const app=express();
const port=5000;
  
connectDB();
app.use(express.json()); 
app.use(cors({
          origin: "https://pixo-8v7o.onrender.com", 
          credentials: true, 
        })
      ); 

      const _dirname=path.resolve();

app.use('/products',ProductRoute);   
app.use('/login-signin',userRoute);
app.use('/post',postRoute);


app.use(express.static(path.join(_dirname,'/pixo_frontend/dist')));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(_dirname,'pixo_drontend',"dist",'index.html'))
});


app.listen(port,()=>{ 
    console.log(`Server running on port ${port}`);
})  