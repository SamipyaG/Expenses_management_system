const mongoose=require('mongoose')

const transactionSchema=mongoose.Schema({
    amount:{
        type:Number,
        require:[true,"the amount is required"]

    },
    category:{
        type:String,
        require:[true,"Catagory is require"]

    },
    refrence:{
        type:String,
        require:[true,"Catagory is require"]
    },
    description:{
        type:String,
        require:[true,"Catagory is require"]
    },
    date:{
         type:String,
         require:[true,"Catagory is require"]
    }},{timestamps:true}
)
const transaction=mongoose.model('transaction',transactionSchema)

module.exports=transaction
