import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const hashPassword=async(password)=>{
       try {
              let salt=await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
              let hash= await bcrypt.hash(password,salt)
              return hash
       }
       catch (error) {
              console.error('Error in hashPassword:', error);
               throw error; 
       }  
       } 

const hashCompare= async(password,hash)=>{
       return bcrypt.compare(password,hash)
}

const createToken=async(payload)=>{
       let token= await jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
       })

       return token
}

const decodeToken=async(token)=>{
      let payload= await jwt.decode(token);
      return payload
}


const validate= async(req,res,next)=>{
       
       let token = await req.headers.authorization?.split(" ")[1];
        if(token){
 
             let payload = await decodeToken(token);
               req.headers.userId= payload.id

             let currentTime= (+new Date()/1000);
              if(req.headers.userId && currentTime < payload.exp){
                   next()
              }
              else{
                  res.status(400).send({
                      message:"Token expired"
                  })
              }
             
            
        }
        else{
            res.status(400).send({
               message:'No token found'
            })
        }
        
 }



export default {
      hashPassword,
      hashCompare,
      createToken,
      decodeToken,
      validate
    
}