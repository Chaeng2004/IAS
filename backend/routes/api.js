const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { registerUser, loginUser, getWebGoatLink } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/webgoat-link', authenticateToken, getWebGoatLink);

export default router;