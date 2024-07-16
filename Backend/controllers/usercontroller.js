const Usermodel = require('../models/userModel');
const tokenModel = require('../models/tokenmodel');
const sentMail = require('../middleware/sentMail');
const jwt=require('jsonwebtoken');//used for authentication
const crypto = require('crypto');
const { error } = require('console');
exports.userRegister = async (req, res) => {
    try {
        //console.log(req.headers.host)
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
            ${process.env.BASEURL}confirmation\/${token.token}`
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
        const user = await Usermodel.findOne({ email: req.body.email });
        if (!user) {
           // console.log("User not found");
            return res.status(403).json({
                error: "Sorry, email or password provided is incorrect"
            });
        }
        if (!user.verified) {
           // console.log("Not verified");
            return res.status(400).json({
                error: "Sorry, email is not verified"
            });
        }
        //console.log("user", user);
        const isMatch = await user.matchPassword(req.body.password);
        if (!isMatch) {
            return res.status(403).json({
                error: "Email or password provided is incorrect"
            });
        }
        
        let token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
        res.cookie('mycookie', token, { expire: Date.now() + 99999 });
        const { _id, name, email } = user;
        return res.json({
            token: token,
            user: {
                _id,
                name,
                email
            },
        });
    } catch (err) {
        res.status(400).json(err);
    }
};
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
   
}
exports.forgetpassword=async(req,res)=>{
//console.log(req.body.email)
try{
    let user = await Usermodel.findOne({ email: req.body.email });
    if(!user){
       console.log("user not found")
    }
    //console.log(user)
    let token = new tokenModel({
        token: crypto.randomBytes(16).toString('hex'),
        userId: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({
            err: "failed to store token "
        })
    }
    sentMail({
        from: 'no-reply@email.com',
        to: req.body.email,
        subject: "password reset link",
        text: `hello \n\n please verify your email by click link below:\n\n
        ${process.env.BASEURL}resetpassword\/${token.token}\/${user._id}
        `,
        html: `
        <p>Hello,${user.name}</p>
        <p>Please verify your email by clicking the link below:</p>
        <p><a href="${process.env.BASEURL}resetpassword/${token.token}/${user._id}">Reset Password</a></p>
    `
    })
    return res.status(200).json({
        token:token,
        message: 'check email to reset your password'
    })
}
catch(err){
    return res.status(400).json({
        message: "email didn't match"
    })
}


}
exports.resetpassword = async (req, res) => {
    try {
        const { token, _id, password } = req.body;
        let resetToken = await tokenModel.findOne({ token });
        if (!resetToken) {
            return res.status(400).json({
                error: "Invalid or expired token"
            });
        }
        let user = await Usermodel.findById(_id);
        if (!user) {
            return res.status(400).json({
                error: "Invalid user"
            });
        }
        user.password = password;
        user = await user.save(); 
        await resetToken.deleteOne();

        return res.status(200).json({
            message: "Password reset successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};