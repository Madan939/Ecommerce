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
    try {
        const salt = await bcrypt.genSalt(10);
        this.password =bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); // Pass error to next middleware
    }
    // const salt=await bcrypt.genSalt(10);
    // this.password=await bcrypt.hash(this.password,salt);
    // next()
 
})
userSchema.methods.matchPassword=async function(enterpassword){
   console.log("enter pass",this.password)
//     let see = await bcrypt.genSalt(10);
//  enterpassword =await bcrypt.hash(enterpassword, see);
//  console.log(enterpassword)
  let match= await bcrypt.compare(this.password,enterpassword)
  console.log(match)
   return match
   
}
const usermodel=mongoose.model("users",userSchema)
module.exports=usermodel