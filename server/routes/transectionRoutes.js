const express=require('express')
const {getAllTransection,addTransection,updateTrasation,deleteTransaction}=require('../controller/transectionController')
const router=express.Router()

router.post('/getAllTrasection',getAllTransection)
router.post('/addTransection',addTransection)
router.post('/updateTransection',updateTrasation)
router.post('/deleteTransection',deleteTransaction)
module.exports=router