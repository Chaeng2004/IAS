const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { registerUser, loginUser, verifyOTP, getWebGoatLink } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP); 
router.post('/login', loginUser);

router.get('/webgoat-link', authenticateToken, getWebGoatLink);

module.exports = router;