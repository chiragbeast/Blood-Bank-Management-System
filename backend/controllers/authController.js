import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, username, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({ fullName, email, username, password, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};
// Login user
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,  // Use environment variable
            { expiresIn: '1h' }
        );

        // Return token and userId
        res.status(200).json({ 
            message: 'Login successful', 
            token, 
            userId: user._id,  // Added userId here
            role: user.role,   // Added user role in response
            username: user.username  // Optional: Include username
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const logoutUser = async (req, res) => {
    const authToken = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!authToken) {
        return res.status(400).json({ message: 'No token provided' });
    }

    // Optionally, blacklist the token or perform other logout logic
    console.log('Token received for logout:', authToken);

    return res.status(200).json({ message: 'Logged out successfully' });
};
