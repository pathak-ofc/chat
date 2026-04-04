import express from 'express';
import { signup, login, logout, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import arcjetMiddleware from '../middlewares/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetMiddleware);

router.get('/test', (req, res) => {
  res.status(200).json({ message: "Arcjet Middleware Test Successful" });
});

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.put('/update-profile', protectRoute, updateProfile);

router.get('/protected', protectRoute, (req, res) => {
  res.status(200).json({ message: "You have accessed a protected route!", user: req.user });
});

export default router;