const billModel=require('../models/billmodel')
exports.newbillcharge=async(req,res)=>{
    //console.log(req.body)
    try{
        const newBill=new billModel(req.body)
        await newBill.save()
        res.status(200).json({
            message:'bill charged successfully'
        })       
    }
    catch(err){
        res.status(400).json(err)
    }
   
}
exports.newbilllist=async(req,res)=>{
    try{
        const bills=await billModel.find()
        res.send(bills)
    }
    catch(err){
        res.status(400).json(err)
    }
}