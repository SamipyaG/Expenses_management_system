const mongoose=require('mongoose')

const transactionSchema=mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:[true,"the amount is required"]

    },
    type:{
        type:String,
        required:[true,"type is require"]

    },
    category:{
        type:String,
        required:[true,"Catagory is require"]

    },
    refrence:{
        type:String,
        required:[true,"refrence is require"]
    },
    description:{
        type:String,
        required:[true,"description is require"]
    },
    date:{
         type:Date,
         required:[true,"date is require"]
    }},{timestamps:true}
)
const transaction=mongoose.model('transaction',transactionSchema)

module.exports=transaction
