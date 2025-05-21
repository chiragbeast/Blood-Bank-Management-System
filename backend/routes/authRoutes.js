import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/register' , registerUser);
router.post('/login' , loginUser);
router.get('/protected-route', authMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Access granted!',
        user: req.user // Decoded user info from token
    });
});
router.post('/logout', logoutUser);
export default router;