const jwt=require('jsonwebtoken');

const authMiddleware=(req,res,next)=>{
    const token=req.header('Authorization');
    if(!token)return res.status(401).json({message: "Access Denied!" });

    try{
        const tokenValue = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
        const verifies=jwt.verify(tokenValue,process.env.JWT_SECRET );
        req.user=verifies;
        next();
    }catch(err){
        res.status(400).json({message:'Invalid token'});
    } 
}

module.exports=authMiddleware; 

