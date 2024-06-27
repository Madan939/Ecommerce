const test=(req,res,next)=>{
    console.log("this is middleware")
    next()
}
module.exports = test