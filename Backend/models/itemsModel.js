const mongoose=require('mongoose')
const itemsSchema=new mongoose.Schema({
    name:{type:String,require:true},
    image:{type:String,require:true},
    price:{type:Number,require:true},
    category:{type:String,require:true}
},{timestamps:true})
const Item= new mongoose.model('Item',itemsSchema)
module.exports=Item