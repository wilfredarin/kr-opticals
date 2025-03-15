import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connectToDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to DB")
    }
    catch(err){
        console.log(err)
    }
}
export default connectToDb;