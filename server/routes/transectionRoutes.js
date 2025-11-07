const express=require('express')
const {getAllTransection,addTransection}=require('../controller/transectionController')



const router=express.Router()

router.get('/getAllTrasection',getAllTransection)
router.post('/addTransection',getAllTransection)
module.exports=router