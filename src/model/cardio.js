import mongoose from "./index.js";

const cardioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    intensityLevel: {
        type: String,
        required: [true, "Intensity level is required"]
    },
    weight:{
        type:Number,
        required:[true,"Weight is required"]
     },
    distance: {
        type: Number,
        required: [true, "Distance is required"]
    },
    duration: {
        type: Number,
        required: [true, "Duration is required"]
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
        default:"cardio"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel", 
        required: true
    }
});

const cardioModel = mongoose.model('cardio', cardioSchema);

export default cardioModel;
