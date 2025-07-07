// === Authentication Routes ===
// Tells our app where to go for sign up and log in!
const express = require('express'); // Helps us make a path for our friends
const router = express.Router(); // Our path maker
const { signup, login } = require('./auth.controller'); // Our magic sign up and log in helpers

// When someone wants to sign up, send them to the signup helper
router.post('/signup', signup);
// When someone wants to log in, send them to the login helper
router.post('/login', login);

module.exports = router; // Share our path with the world! 