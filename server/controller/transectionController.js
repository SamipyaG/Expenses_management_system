const transaction=require("../model/transectionModel")

const getAllTransection=async(req,res)=>{
    try{
    const transactionAll=await transaction.find({userid:req.body.userid})
    res.status(200).json(transactionAll)

    }catch(error){
        res.status(500).json({
            message:"problem while getting the transaction",
            success:false,
            error:error.message
        })
    }

}
const updateTrasation=async(req,res)=>{
    try{
        const {transactionId, ...updateData}=req.body
        await transaction.findByIdAndUpdate(transactionId,updateData)
        res.status(200).json({
            message:"The transaction updated successfully ",
            success:true
        })
    }catch(error){
        res.status(502).json({
            message:"Problem while updating the transaction",
            success:false,
            error:error.message
        })

    }
}
const deleteTransaction=async(req,res)=>{
    try{
        const {transactionId}=req.body
        await transaction.findByIdAndDelete(transactionId)
        res.status(200).json({
            message:"Transaction deleted successfully",
            success:true
        })
    }catch(error){
        res.status(500).json({
            message:"problem while deleting the transaction",
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
    addTransection,
    updateTrasation,
    deleteTransaction
}