import userModel from '../model/user.js'
import Auth from '../common/Auth.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const createUser=async(req,res)=>{

         try {
             let user=await userModel.findOne({email:req.body.email})

             if(!user){
                req.body.password= await Auth.hashPassword(req.body.password)
                 let user=await userModel.create(req.body);
                res.status(201).send({
                    message:"User created sucessfully", 
                    user
                })
             }
             else{
                res.status(400).send({message:`User with ${req.body.email} already exists`})
             }
             
            
         } catch (error) {
                res.status(500).send({
                    message:"Internel server Error"
            })
         }
}

const login= async(req,res)=>{
      
       try {

            let user= await userModel.findOne({email:req.body.email})

            if(user){
                    
                  let hashCompare =await Auth.hashCompare(req.body.password,user.password)
                  if(hashCompare){

                        let token= await Auth.createToken({
                              id:user._id,
                              name:user.name,
                              email:user.email
                        })
                        user= await userModel.findOne({email:req.body.email},{_id:0,email:0,password:0,createdAt:0})
                        res.status(201).send({
                             message:"Login sucessfull",
                             token,
                             user
                        })
                  }
                  else{
                    res.status(400).send({
                        message:`Invalid Password`
                   })
                  }
                   
            }else{
                res.status(400).send({
                    message:`Account with ${req.body.email} does not exists`
               })
            }
       } catch (error) {
        
            res.status(500).send({
                message:"Internel server Error"
            })
       }
}

const forgetPassword = async (req, res) => {
     try {
       let user = await userModel.findOne({ email: req.body.email });
       
       if (user) {
         // Set the expiration time to 2 minutes from now (you can adjust this as needed)
         const expirationTime = Math.floor(Date.now() / 1000) + 2 * 60;
   
          const token = jwt.sign(
               {
               id: user._id,
               name: user.name,
               email: user.email,
               exp: expirationTime,
               },
               process.env.JWT_SECRET
          );
          
           const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
   
          // send email using nodemailer
          const transporter = nodemailer.createTransport({
               service: 'gmail',
               auth: {
               user: process.env.EMAIL_ID,
               pass: process.env.EMAIL_PASS,
               },
          });
   
          const mailOptions = {
               from: process.env.EMAIL_ID,
               to: user.email,
               subject: 'Password Reset Link',
               text: `Click the following link to reset your password\n ${resetLink}`,
          };
   
          transporter.sendMail(mailOptions, (error, info) => {
               if (error) {
                    console.log(error);
                    res.status(500).send({
                         message: 'Failed to send the password reset mail',
                    });
               } else {
                    console.log(info.response);
                    res.status(200).send({
                         message: 'Password reset mail sent successfully',
                         resetLink,
                    });
               }
          });

          } else {
               res.status(400).send({
                    message: `Account with ${req.body.email} does not exist`,
               });
          }
     } catch (error) {
          console.log(error);
          res.status(500).send({
          message: 'Internal Server Error',
     });
     }
};
   
const resetPassword=async(req,res)=>{
     try {
           
           let token =req.headers.authorization?.split(" ")[1];
          
           if(token){
              let data= await Auth.decodeToken(token);

               // Check if the token has expired
               if (data.exp < Date.now() / 1000) {
                    return res.status(400).send({
                    message: 'Reset link has expired. Please request a new one.',
                    });
               }

                if(req.body.newpassword===req.body.confirmpassword){

                     let user= await userModel.findOne({email:data.email});
                       user.password=await Auth.hashPassword(req.body.newpassword)

                       await user.save();

                       res.status(201).send({
                           message:"Password updated sucessfully"
                       })

                }else{
                   res.status(400).send({
                       message:"Password does not match"
                   })
                }
         }
         else{
           res.status(400).send({
               message:"Token not found"
           })
         }


     } catch (error) {
        console.log(error);
     }
}












export default {
       createUser,
       login,
       forgetPassword,
       resetPassword
}