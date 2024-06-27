const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const userSchema=mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    verified:{type:Boolean,require:true},
},{timestamps:true})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next()
})
userSchema.methods.matchPassword=async function(enterpassword){
    console.log("enter pass",enterpassword)
    return await bcrypt.compare(enterpassword,this.password)
}
const usermodel=mongoose.model("users",userSchema)
module.exports=usermodel