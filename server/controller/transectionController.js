const transaction=require("../model/transectionModel")

const getAllTransection=async(req,res)=>{
    try{
    const transactionAll=await transaction.find({})
    res.status(200).json(transactionAll)

    }catch(error){
        res.status(500).json({
            message:"problem while getting the transaction",
            success:false,
            error:error.message
        })
    }

}
const addTransection=async(req,res)=>{
    try{
        const newTransaction=new transaction(req.body)
         await newTransaction.save()
         res.status(201).json({
            message:"new transaction added",
            success:true
         })

    }catch(error){
        res.status(500).json({
            message:"Error while adding the transaction",
            success:false,
            error:error.message
        })
    }

}

module.exports={
    getAllTransection,
    addTransection
}