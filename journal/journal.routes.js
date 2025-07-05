const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');
const { createEntry, getEntries } = require('./journal.controller');

// Create a new journal entry
router.post('/', authenticateToken, createEntry);
// Get all journal entries for the logged-in user
router.get('/', authenticateToken, getEntries);

module.exports = router; 