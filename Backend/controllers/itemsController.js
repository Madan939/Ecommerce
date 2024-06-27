const Item=require('../models/itemsModel')
exports.getAllItems=async(req,res)=>{
    try{
        const items=await Item.find()
        res.send(items)
    }
    catch(err){
        res.status(400).json(err)
    }
}
exports.addnewitems=async(req,res)=>{
    try{
        //console.log(req.body)
       //const newitems=new Item(req.body)
       const newitem=new Item({
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        image:req.file.path
       })
       console.log(newitems)
       await newitem.save()
       res.send("item added successfully")
    }
    catch(err){
        res.status(400).json(err)
    }
}
exports.getedititems=async(req,res)=>{
   // console.log(req.params._id)
   try{
    const id=req.params._id
    const item= await Item.findById(id)
   // console.log(item)
   if(item){
    res.send(item)
   }
   else{
    console.log("error")
   }
   }
   catch(err){
    res.status(400).json(err)
   }

}
exports.postupdateitems=async(req,res)=>{
    const id=req.body.id
    const {name,image,category,price}=req.body
    try{
        await Item.findByIdAndUpdate(id,{
            name,price,image,category
        })
        res.send("updated successfully")
    }
    catch(err){
        res.status(400).json(err)
       }
 

}
exports.postdeleteitems=async(req,res)=>{
    const id=req.params._id
    try{
        await Item.findByIdAndDelete(id)
        res.send("deleted successfully")
    }
    catch(err){
        res.status(400).json(err)
       }
}