const mongoose = require('mongoose');
const bcrypt = require('bcrypt')




const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const hashpassword = await bcrypt.hash(this.password, 10);
    this.password = hashpassword;
    next()
})

const User = mongoose.model('auth', userSchema);

module.exports = User;
