// === Authentication Controller ===
// Helps friends sign up and log in to the club!

// This file helps people sign up and log in to our journal app!
const bcrypt = require('bcrypt'); // This scrambles passwords so no one can peek!
const jwt = require('jsonwebtoken'); // This makes secret tickets for our friends.
const { PrismaClient } = require('@prisma/client'); // This helps us talk to our magic database.
const prisma = new PrismaClient(); // Our magic database friend.
require('dotenv').config(); // Load our secret keys!

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; // Our super secret key for tickets

// This function helps a new friend sign up
async function signup(req, res) {
  const { email, password } = req.body; // What our friend tells us
  if (!email || !password) {
    // If they forget to tell us something
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    // Check if our friend already lives here
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use.' });
    }
    // Scramble their password so it's safe
    const hashedPassword = await bcrypt.hash(password, 10);
    // Add our new friend to the database
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.status(201).json({ message: 'User created successfully.' }); // Yay! Friend added
  } catch (err) {
    res.status(500).json({ error: 'Server error.' }); // Oops! Something went wrong
  }
}

// This function helps a friend log in
async function login(req, res) {
  const { email, password } = req.body; // What our friend tells us
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    // Find our friend in the database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    // Check if their password matches
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    // Give them a secret ticket to use the app
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token }); // Here is your ticket!
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}

module.exports = { signup, login }; // Share our magic functions with others! 