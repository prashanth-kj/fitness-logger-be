import mongoose from "./index.js";

const validateEmail = (e)=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e); 
}

const userSchema= new mongoose.Schema({
      name:{
          type:String,
          required:[true, "username is required"]
      },
      email:{
          type:String,
          required:[true, "email is required"],
          validate:validateEmail
      },
      password:{
          type:String,
          required:[true,"Password is required"]
      },
      createdAt:{
        type:Date,
        default:Date.now()
     }
})


const userModel= mongoose.model("users",userSchema)

export default userModel;