const Usermodel = require('../models/userModel');
const tokenModel = require('../models/tokenmodel');
const sentMail = require('../middleware/sentMail');
const jwt=require('jsonwebtoken');//used for authentication
const crypto = require('crypto');
const { error } = require('console');
exports.userRegister = async (req, res) => {
    try {
        console.log(req.headers.host)
        let newUser = new Usermodel({ ...req.body, verified: false })
        newUser = await newUser.save()
        //res.send("user registered successfully")
        if (!newUser) {
            return res.status(400).json({
                err: "failed to create user "
            })
        }

        let token = new tokenModel({
            token: crypto.randomBytes(16).toString('hex'),
            userId: newUser._id
        })
        token = await token.save()
        if (!token) {
            return res.status(400).json({
                err: "failed to store token "
            })
        }
        //send email
        sentMail({
            from: 'no-reply@email.com',
            to: newUser.email,
            subject: "email verification link",
            text: `hello \n\n please verify your email by click link below:\n\n
            ${process.env.BASEURL}confirmation\/${token.token}
            `
            // http://localhost:8001/api/confirmation/absd111 
        })
        return res.status(200).json({
            message: 'registered succesfully, check email for verification'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.userLogin = async (req, res) => {
    // console.log(req.body)
    try {
        const user = await Usermodel.findOne({email: req.body.email})
        if(!user.verified){
            console.log("not verified")
            return res.status(400).json({
                error:"sorry email is not verified"
            })
        }
        if(!user){
            console.log("not verified")
            return res.status(403).json({
                error:"sorry email or password provided is incorrect"
            })
        } 
        console.log("user",user)
        const isMatch =await user.matchPassword(req.body.password);
        if (!isMatch) {
            return res.status(403).json({
                error: "Email or password provided is incorrect"
            });
        }  
        
        // if(!user.matchPassword(req.body.password)){
        //     return res.status(400).json({
        //         error:"sorry email or password provided is incorrect"
        //     })
        // }
      
      
            // res.status(200).json({
            //     message: 'login succesfully',
            //     user: user
            // })
            let token=jwt.sign({_id:user._id},process.env.JWT_TOKEN)
            res.cookie('mycookie',token,{expire:Date.now()+99999})
            const {_id,name,email}=user
            return res.json({
                token:token,
                user:{
                    _id,
                    name,
                    email
                },
            })
    
        // else {
        //     res.status(400).json({
        //         message: 'login failed'
        //     })
        // }
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.verifyEmail = async (req, res) => {
    try {
        let token = await tokenModel.findOne({
            token: req.params.token
        })
        if (!token) {
            return res.status(400).json({
                error: "invalid token or token expires"
            })
        }
        let user = await Usermodel.findOne({ _id: token.userId })
        if (!user) {
            return res.status(400).json({
                error: "invalid user"
            })
        }
        if (user.verified) {
            return res.status(400).json({
                error: "user is already verified "
            })
        }
        user.verified = true
       user= user.save()
       if(!user){
        return res.status(400).json({
            error: "something went wrong"
        })
       }
        res.status(200).json({
            message: "your email has been verified, continue to login"
        })
    }
    catch (err) {
        res.status(400).json(err)
    }
    // tokenModel.findOne({ token: req.params.token }, (err, token) => {
    //     if (err || !token) {
    //         return res.status(400).json({
    //             error: "invalid token or token expires"
    //         })
    //     }
    //     //if we find valid token
    //     Usermodel.findOne({_id:token.userId},(err,user)=>{
    //         if(err || !user){
    //             return res.status(400).json({
    //                 error:"invalid user"
    //             })
    //         }
    //          //if user ia already verified
    //         if(user.verified){
    //             return res.status(400).json({
    //                 error:"user is already verified "
    //             })
    //         }
    //         //save verified user
    //         user.verified=true
    //         user.save((err)=>{
    //             if(err){
    //                 return res.status(400).json({
    //                     error:err
    //                 })
    //             }
    //           res.status(200).json({
    //             message:"your email has been verified, continue to login"
    //           })  
    //         })
    //     })

    // })
}