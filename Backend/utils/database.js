const mongoose=require('mongoose')
const url="mongodb://madantamang939:WJuSbn7L4wrr4Ve5@ac-jwnd5yp-shard-00-00.taznrti.mongodb.net:27017,ac-jwnd5yp-shard-00-01.taznrti.mongodb.net:27017,ac-jwnd5yp-shard-00-02.taznrti.mongodb.net:27017/testdb?replicaSet=atlas-un80sn-shard-0&ssl=true&authSource=admin"
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