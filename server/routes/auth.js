const express = require('express');
const router = express.Router();

// Import the controller functions, including getMe
const { register, login, getMe } = require('../controllers/authController');

// Import the authentication middleware
const auth = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Private route for getting user data
router.get('/me', auth, getMe);

module.exports = router;