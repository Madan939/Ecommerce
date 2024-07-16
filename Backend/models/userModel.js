const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt); 
        next();
    } catch (error) {
        next(error); // Pass error to next middleware
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    console.log("enter pass", this.password);
    let match = await bcrypt.compare(enteredPassword, this.password); // Correct order of arguments
    console.log(match);
    return match;
}

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;