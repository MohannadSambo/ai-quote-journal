// === Journal Controller ===
// Lets friends write, read, change, and erase their stories!

// This file helps our friends write, read, change, and erase their journal entries!
const { PrismaClient } = require('@prisma/client'); // This helps us talk to our magic database.
const prisma = new PrismaClient(); // Our magic database friend.

// This function lets a friend write a new journal entry
async function createEntry(req, res) {
  const { entryText, aiResponse } = req.body; // What our friend wrote
  const userId = req.user.userId; // Who is our friend?
  if (!entryText) {
    // If they forgot to write something
    return res.status(400).json({ error: 'Entry text is required.' });
  }
  try {
    // Add the new story to our magic database
    const entry = await prisma.journalEntry.create({
      data: {
        entryText,
        aiResponse: aiResponse || '', // The magic AI answer (if any)
        userId,
      },
    });
    res.status(201).json(entry); // Yay! Story saved
  } catch (err) {
    res.status(500).json({ error: 'Server error.' }); // Oops! Something went wrong
  }
}

// This function lets a friend see all their journal entries
async function getEntries(req, res) {
  const userId = req.user.userId; // Who is our friend?
  try {
    // Find all the stories our friend wrote
    const entries = await prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }, // Show newest first
    });
    res.json(entries); // Here are your stories!
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}

// This function lets a friend see just one journal entry
async function getEntryById(req, res) {
  const userId = req.user.userId; // Who is our friend?
  const entryId = parseInt(req.params.id, 10); // Which story?
  if (isNaN(entryId)) {
    return res.status(400).json({ error: 'Invalid entry ID.' });
  }
  try {
    // Find the story with the right number and friend
    const entry = await prisma.journalEntry.findFirst({
      where: {
        id: entryId,
        userId: userId,
      },
    });
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found.' }); // No story found!
    }
    res.json(entry); // Here is your story!
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}

// This function lets a friend change a journal entry
async function updateEntry(req, res) {
  const userId = req.user.userId; // Who is our friend?
  const entryId = parseInt(req.params.id, 10); // Which story?
  const { entryText } = req.body; // What do they want to change?

  if (!entryText) {
    return res.status(400).json({ error: 'Entry text is required.' });
  }

  try {
    // Find the story first
    const entry = await prisma.journalEntry.findFirst({
      where: { id: entryId, userId }
    });
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found.' });
    }
    // Change the story in our magic database
    const updatedEntry = await prisma.journalEntry.update({
      where: { id: entryId },
      data: { entryText }
    });
    res.json(updatedEntry); // Here is your new story!
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}

// This function lets a friend erase a journal entry
async function deleteEntry(req, res) {
  const userId = req.user.userId; // Who is our friend?
  const entryId = parseInt(req.params.id, 10); // Which story?

  try {
    // Find the story first
    const entry = await prisma.journalEntry.findFirst({
      where: { id: entryId, userId }
    });
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found.' });
    }
    // Erase the story from our magic database
    await prisma.journalEntry.delete({
      where: { id: entryId }
    });
    res.json({ message: 'Entry deleted successfully.' }); // Story erased!
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}

module.exports = { createEntry, getEntries, getEntryById, updateEntry, deleteEntry }; // Share our magic helpers! 