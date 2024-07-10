const mongoose=require('mongoose')
//const url="mongodb://admin:6gBKXtf1ctnVMoAa@ac-uacranl-shard-00-00.vxrauk5.mongodb.net:27017,ac-uacranl-shard-00-01.vxrauk5.mongodb.net:27017,ac-uacranl-shard-00-02.vxrauk5.mongodb.net:27017/?replicaSet=atlas-zoz91o-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
 const url=process.env.DATABASE
mongoose.connect(url);
const connectobj=mongoose.connection;
connectobj.on('connected',()=>{
    console.log("database connected")
})
connectobj.on('error',(error)=>{
    console.log('connection error',error)
})
connectobj.on('disconnected',()=>{
    console.log("database disconnected")
})
process.on('SIGINT',async()=>{
    await mongoose.connection.close()
    process.exit(0)
})
module.exports=connectobj
