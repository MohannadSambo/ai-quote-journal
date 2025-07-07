// === Journal Routes ===
// Tells our app where to go for journal adventures!

// This file tells our magic book where to go when someone wants to write, read, change, or erase a journal entry!
const express = require('express'); // Helps us make a path for our friends
const router = express.Router(); // Our path maker
const authenticateToken = require('../utils/authMiddleware'); // Our secret guard!
const { createEntry, getEntries, getEntryById, updateEntry, deleteEntry } = require('./journal.controller'); // Our magic helpers for journals

// When someone wants to write a new journal entry
router.post('/', authenticateToken, createEntry);
// When someone wants to see all their journal entries
router.get('/', authenticateToken, getEntries);
// When someone wants to see just one journal entry
router.get('/:id', authenticateToken, getEntryById);
// When someone wants to change a journal entry
router.put('/:id', authenticateToken, updateEntry);
// When someone wants to erase a journal entry
router.delete('/:id', authenticateToken, deleteEntry);

module.exports = router; // Share our path with the world! 