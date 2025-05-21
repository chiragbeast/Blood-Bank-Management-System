import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Middleware to verify JWT token
export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. Token missing or malformed.' });
        }

        const token = authHeader.split(" ")[1]; // Extract token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        
        req.user = decoded; // Attach user info to request
        next(); // Proceed to next middleware/controller

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: 'Token expired. Please log in again.' });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: 'Invalid token. Access denied.' });
        }
        res.status(401).json({ message: 'Authentication failed.' });
    }
};

export default authMiddleware;
