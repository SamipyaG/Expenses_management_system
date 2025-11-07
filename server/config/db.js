const mongoose=require("mongoose")
const connectToDatabase=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Database connected successfully")
    }catch(error){
        console.log("Database connection error",error)
    }
}
module.exports=connectToDatabase;