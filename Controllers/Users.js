const User = require('../Models/User');


exports.signup = async(req, res) => {
    try {
        const {fullname, email, password} = req.body
        const user = new User({fullname, email, password});
        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user')
    }
}




exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).send('Invalid password')
        }
        res.status(200).send('Login successful');
    }catch(error){
        console.log(error);
        res.status(500).send('Error logging in')
    }
}

