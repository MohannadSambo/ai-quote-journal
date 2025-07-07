// === Secret Guard Middleware ===
// Checks if friends have a magic ticket before letting them in!

// This is our secret guard! It checks if our friends have a magic ticket (token) before letting them in.
const jwt = require('jsonwebtoken'); // Helps us check tickets
require('dotenv').config(); // Load our secret key

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; // Our super secret key

function authenticateToken(req, res, next) {
  // Look for the magic ticket in the hat (header)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get the ticket part
  if (!token) return res.status(401).json({ error: 'No token provided.' }); // No ticket, no entry!

  // Check if the ticket is real
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' }); // Bad ticket!
    req.user = user; // Good ticket! Let them in and remember who they are
    next(); // Go to the next part of the story
  });
}

module.exports = authenticateToken; // Share our secret guard! 