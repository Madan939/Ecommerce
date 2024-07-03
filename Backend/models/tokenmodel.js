const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;
const tokenSchema=new mongoose.Schema({
    token:{
        type:String,
        require:true
    },
    userId:{
        type:ObjectId,
        ref:'users',
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:3000
    }
});
module.exports=mongoose.model('token',tokenSchema);