import User from "../schemas/userModel.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: 'User already exists.' });
        return;
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        const token = generateToken(res, user._id, 'userJwt');
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        });
    } else {
        res.status(400).json({ message: 'Invalid user data.' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token = generateToken(res, user._id, 'userJwt');
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

export const listUsers = async (req, res) => {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
};