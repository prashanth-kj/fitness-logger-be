import resistanceModel from '../model/resistance.js'

const createResistance =async(req,res)=>{
    try {

        let {name,userweight,weightLift,sets,reps,date}=req.body

          if(!name || !userweight ||!weightLift||!sets||!reps||!date){
              res.status(400).send({
                message:"All data field required"
              })
          }
         // calclulate calories buring value

         let volumeWeight = weightLift * sets * reps;
          
         let caloricCostPerUnitOfWork = 1.5;  //It is default assume value
         let  caloriesBurned= volumeWeight * caloricCostPerUnitOfWork * (userweight/1000);

           req.body.caloriesBurned= caloriesBurned.toFixed(2);
           req.body.userId=req.headers.userId

           let resistance= await resistanceModel.create(req.body);

              res.status(201).send({
                 message:"Resistance created sucessfully",
                 resistance
              })
      
    } catch (error) {
        res.status(500).send({
            message:"Internal servar error",
            error:error.message
      })
    }
}

const getResistanceByUserId=async(req,res)=>{
    try {

         let resistance= await resistanceModel.find({userId:req.headers.userId},{userId:0}).sort({date:1})
            if(resistance){
                 res.status(200).send({
                     message:"All resistance data fetched sucessfully",
                     resistance
                 })
            }else{
                res.status(400).send({
                    message:"Invalid resistance Data found"
                })
            }
      
    } catch (error) {
        res.status(500).send({
            message:"Internal servar error",
            error:error.message
      })
    }
}


const getResistancebyId =async(req,res)=>{
    try {

      let resistanceId= req.params.id;
       if(resistanceId){
              
             let resistance= await resistanceModel.findOne({_id:resistanceId},{_id:0,userId:0})

               if(resistance){
                    res.status(200).send({
                        message:"Resistance data fetched sucessfully",
                        resistance
                    })
               }
            
       }else{
            res.status(400).send({
                message:"Invalid resistance Id found",
                
            })
       }


    } catch (error) {
        res.status(500).send({
            message:"Internal servar error",
            error:error.message
      })
    }
}

const deleteResistancebyId =async(req,res)=>{
    try {
        let resistanceId= req.params.id;
        if(resistanceId){
            
              let resistance= await resistanceModel.deleteOne({_id:resistanceId});
               res.status(200).send({
                 message:"Resistance deleted sucessfully",
                 resistance
               })
        }else{
            res.status(400).send({
                message:"Invalid resistance Id found",
                
            })
        }
      
    } catch (error) {
        res.status(500).send({
            message:"Internal servar error",
            error:error.message
      })
    }
}



export default {
    createResistance,
    getResistanceByUserId,
    getResistancebyId,
    deleteResistancebyId
}
