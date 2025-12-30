const Activity=require("../models/activity.model")

const logActivity=async(message,type="general")=>{
    try{
        await Activity.create({message,type});
    }catch(err){
         console.error("Activity log failed",err.message)
    }
};

module.exports=logActivity