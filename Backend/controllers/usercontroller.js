const Usermodel = require('../models/userModel')
exports.userRegister = async (req, res) => {
    try {
        const newUser = new Usermodel({ ...req.body, verified: false })
        await newUser.save()
        //res.send("user registered successfully")
        res.status(200).json({
            message: 'registered succesfully, wait for verification'
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