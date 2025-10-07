const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController'); // Add getMe
const auth = require('../middleware/authMiddleware'); // Import auth middleware

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe); // Add this new route

module.exports = router;