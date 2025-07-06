const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new journal entry
async function createEntry(req, res) {
  const { entryText, aiResponse } = req.body;
  const userId = req.user.userId;
  if (!entryText) {
    return res.status(400).json({ error: 'Entry text is required.' });
  }
  try {
    const entry = await prisma.journalEntry.create({
      data: {
        entryText,
        aiResponse: aiResponse || '', // Placeholder for now
        userId,
      },
    });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}

// Get all journal entries for the logged-in user
async function getEntries(req, res) {
  const userId = req.user.userId;
  try {
    const entries = await prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}

async function getEntryById(req, res) {
  const userId = req.user.userId;
  const entryId = parseInt(req.params.id, 10);
  if (isNaN(entryId)) {
    return res.status(400).json({ error: 'Invalid entry ID.' });
  }
  try {
    const entry = await prisma.journalEntry.findFirst({
      where: {
        id: entryId,
        userId: userId,
      },
    });
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found.' });
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}

module.exports = { createEntry, getEntries, getEntryById }; 