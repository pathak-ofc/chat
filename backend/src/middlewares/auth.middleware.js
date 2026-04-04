import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import "dotenv/config";

export const protectRoute = (req, res, next) => {
    try {
        const token = req.cookie.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }   

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in protectRoute middleware:', error);
        res.status(500).json({ message: 'Server error'});
    }
};
