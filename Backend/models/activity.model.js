const mongoose=require("mongoose")
const activitySchema=new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["candidate", "assessment", "course", "auth","general"],
        default:"general"
    }
},{timestamps:true});
module.exports=mongoose.model("Activity",activitySchema)