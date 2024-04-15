const User = require('../Models/User');
const jwt = require('jsonwebtoken');


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
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('Invalid email or password');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).send('Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: '15m' });

        // Send token in response
        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
};
