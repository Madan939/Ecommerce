require('dotenv').config()
const express = require('express');
const dbconnect=require('./utils/database')
const app=express()
const cors=require('cors')
const itemsRoute=require('./routes/itemsRoute')
const userRoute=require('./routes/userRoute')
const billRoute=require('./routes/billroute')
// const uri = "mongodb://madantamang939:FjuD4gUKrCp2wqEk@ac-jwnd5yp-shard-00-00.taznrti.mongodb.net:27017,ac-jwnd5yp-shard-00-01.taznrti.mongodb.net:27017,ac-jwnd5yp-shard-00-02.taznrti.mongodb.net:27017/?replicaSet=atlas-un80sn-shard-0&ssl=true&authSource=admin"
app.use('/public/uploads',express.static('public/uploads'))
app.use(express.json())
app.use(cors())
app.use('/api/items',itemsRoute)
app.use('/api/users',userRoute)
app.use('/api/bills',billRoute)
const port=process.env.PORT || 8001
app.listen(port,()=>{
  console.log(`server is running in ${port}`)
})

