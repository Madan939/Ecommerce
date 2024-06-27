const mongoose=require('mongoose')
const billSchema=new mongoose.Schema({
    customername:{type:String,require:true},
    customerphone:{type:String,require:true},
    item:{type:Array,require:true},
    payment:{type:String,require:true},
    subtotal:{type:Number,require:true},
    tax:{type:Number,require:true},
    totalamount:{type:Number,require:true},
    user:{type:String,require:true}
},{timestamps:true})
const billModel= new mongoose.model('bills',billSchema)
module.exports=billModel