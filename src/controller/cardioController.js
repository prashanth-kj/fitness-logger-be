import cardioModel from '../model/cardio.js'

let cardioMETData = {
    "Walking": {
        "slow": 2.5,
        "moderate": 4.0,
        "fast": 6.0
    },
    "Running": {
        "slow": 7.0,
        "moderate": 9.0,
        "fast": 12.0
    },
    "Cycling": {
        "slow": 3.0,
        "moderate": 6.0,
        "fast": 8.0
    },
    "Swimming": {
        "slow": 5.0,
        "moderate": 7.0,
        "fast": 9.0
    },
    "Jumping_jacks": {
        "slow": 6.0,
        "moderate": 8.0,
        "fast": 10.0
    }
};

const createCardio =async(req,res)=>{
      try {
          
         let {name,intensityLevel,weight,distance,duration,date}=req.body
        
         if(!name || !intensityLevel || !weight || !distance || !duration || !date){
             return  res.status(400).send({
                  message:"All data field is required"
               })
         }
        // find metvalue
         const metValue= cardioMETData[name]? cardioMETData[name][intensityLevel]:null;

          if(metValue===null){
            return  res.status(400).send({
                  message:"Invalid exercise name or intensity level"
              })
          }
               
          //calculate calories burned value
          const caloriesBurned= metValue * weight *  (duration / 60);

                req.body.caloriesBurned= caloriesBurned.toFixed(2)
                
                req.body.userId=req.headers.userId
               
            let cardio= await cardioModel.create(req.body);

                res.status(201).send({
                message:"cardio created sucessfully",
                cardio
            })

        
      } catch (error) {
           return res.status(500).send({
                message:"Internal servar error",
                error:error.message
        })
      }
}



const getCardioByUserId =async(req,res)=>{
    try {
         let cardio= await cardioModel.find({userId:req.headers.userId},{userId:0}).sort({date:1})
           if(cardio){
                 res.status(200).send({
                     message:"All cardio by user fetched sucessfully",
                     cardio
                 })
                
           }else{
            res.status(400).send({
                message:"cardio data not found",
               
          })
           }
        
    } catch (error) {
        res.status(500).send({
            message:"Internal servar error",
            error:error.message
      })
    }
}

const getCardioById =async(req,res)=>{
    try {
        
          let cardioId= req.params.id;
          if(cardioId){
              let cardio =await cardioModel.findOne({_id:cardioId},{_id:0,userId:0});
                
                    res.status(200).send({
                         message:"cardio data fetched sucessfully",
                         cardio
                    })
          }else{
               res.status(400).send({
                 message:"Invalid cardioId found"
               })
          }
          
      
    } catch (error) {
        res.status(500).send({
            message:"Internal servar error",
            error:error.message
      })
    }
}

const deleteCardioById =async(req,res)=>{
    try {
        let cardioId= req.params.id;
            if(cardioId){
                let cardio =await cardioModel.findOne({_id:cardioId});
                 if(cardio){
                    
                      let deleteCardio=await cardioModel.deleteOne({_id:cardioId})
                        res.status(200).send({
                             message:"cardio deleted sucessfully",
                             deleteCardio
                        })
                 }


            }else{
                  res.status(400).send({
                    message:"Invalid cardioId found"
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
    createCardio,
    getCardioByUserId,
    getCardioById,
    deleteCardioById
}