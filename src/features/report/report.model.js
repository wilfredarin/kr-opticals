import mongoose from "mongoose";


const reportSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    
},{timestamps:true});



const Report  = mongoose.model("Report",reportSchema)

export default Report;