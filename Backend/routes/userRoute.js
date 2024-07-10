const express=require('express')
const userController=require('../controllers/usercontroller')
const test = require('../middleware/test')
const router=express.Router()
router.post('/userRegister',userController.userRegister)
router.post('/userLogin',test,userController.userLogin)
router.get('/confirmation/:token',test,userController.verifyEmail)
module.exports=router