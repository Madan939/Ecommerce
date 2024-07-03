const Usermodel = require('../models/userModel');
const tokenModel=require('../models/tokenmodel');
const sentMail=require('../middleware/sentMail');
const crypto=require('crypto');
exports.userRegister = async (req, res) => {
    try {
        console.log(req.headers.host)
        let newUser = new Usermodel({ ...req.body, verified: false })
        newUser =await newUser.save()
        //res.send("user registered successfully")
        if(!newUser){
            return res.status(400).json({
                err:"failed to create user "
            })
        }
       
        let token=new tokenModel({
            token:crypto.randomBytes(16).toString('hex'),
            userId:newUser._id
        }) 
        token=await token.save()
        if(!token){
            return res.status(400).json({
                err:"failed to store token "
            })
        }
        //send email
        sentMail({
            from:'no-reply@email.com',
            to:newUser.email,
            subject:"email verification link",
            text:`hello \n\n please verify your email by click link below:\n\n
            http:\/\/${req.headers.host}\/api\/confirmation\/${token.token}
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
    try {
        const user = await Usermodel.findOne({
            email: req.body.email,
           // password: req.body.password,
            verified: true

        })
        console.log(user)
        if (user &&  await user.matchPassword(req.body.password)) {
            res.status(200).json({
                message: 'login succesfully',
                user: user
            })
        }
        else {
            res.status(400).json({
                message: 'login failed'
            })
        }
    }
    catch (err) {
        res.status(400).json(err)
    }
}