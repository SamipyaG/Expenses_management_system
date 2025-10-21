const mongoose=require("mongoose")

const connectToDatabase=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL)

    }catch(error){
        console.log("Database connection error",error)
    }}
    module.exports=connectToDatabase;