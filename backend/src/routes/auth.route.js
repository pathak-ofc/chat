import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);

router.get('/signin', (req, res) => {
    res.send('Signin route');
});

router.get('/logout', (req, res) => {
    res.send('Logout route');
});

export default router;