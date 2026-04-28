const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { getWebGoatLink } = require('../controllers/authController');

router.get('/webgoat-link', authenticateToken, getWebGoatLink);

module.exports = router;