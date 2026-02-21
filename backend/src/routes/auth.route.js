import express from 'express';

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send('Signup route');
});

router.get('/signin', (req, res) => {
    res.send('Signin route');
});

router.get('/logout', (req, res) => {
    res.send('Logout route');
});

export default router;