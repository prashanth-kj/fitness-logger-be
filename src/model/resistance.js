import mongoose from "./index.js";

const resistanceSchema= new mongoose.Schema({
       name:{
          type:String,
          required:[true,"Name is required"]
       },
       userweight:{
        type:Number,
        required:[true,"userWeight is required"]
     },
       weightLift:{
          type:Number,
          required:[true,"WeightLift is required"]
       },
       sets:{
           type:Number,
           required:[true,"Set is required"]
       },
       reps:{
           type:Number,
           required:[true,"reps is required"]
       },
       caloriesBurned: {
        type: Number
       },
       date: {
        type: Date,
        required: true
       },
       type:{
         type:String,
         default:"resistance"
       },
       userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel", 
        required: true
       }
})

const resistanceModel= mongoose.model("resistance",resistanceSchema);
export default resistanceModel