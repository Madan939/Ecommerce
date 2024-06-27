const express=require('express')
const billController=require('../controllers/billController')
const router=express.Router()
router.post('/charge-bill',billController.newbillcharge)
router.get('/bill-list',billController.newbilllist)
module.exports=router