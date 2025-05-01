const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

/**
 * @description Routes for user register and login
 */


// POST /register: Register a new user
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
