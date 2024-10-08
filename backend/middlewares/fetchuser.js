const jwt=require('jsonwebtoken');
const JWT_SECRET = `$9G@3d!23f4`;


const fetctuser=(req,res,next)=>{
    //Get the user from the jwt token and add it t req object
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"Please authenticate using a valid token"});
    }
    try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next()
    }catch(error){
        res.status(400).send("Please authenticate using a valid token");
    }
}


module.exports= fetctuser;