// === AI Quote Journal Server ===
// This is the main server for our magic journal app!
// It helps us talk to the computer and our friends (the users).
const express = require('express'); // This helps us make a web server.
const cors = require('cors'); // This lets everyone talk to our server.
const dotenv = require('dotenv'); // This helps us keep secrets safe.
dotenv.config(); // Load our secrets!

// We need to know where our friends live (routes)
const authRoutes = require('../auth/auth.routes'); // For signing up and logging in
const journalRoutes = require('../journal/journal.routes'); // For writing and reading journals

const app = express(); // Our magic book is now open!
const PORT = process.env.PORT || 4000; // This is the door number to our house

app.use(cors()); // Let everyone visit our house
app.use(express.json()); // We want to read what our friends say in English (JSON)

// Tell our magic book where to find the sign up and journal pages
app.use('/auth', authRoutes); // If someone wants to sign up or log in
app.use('/journal', journalRoutes); // If someone wants to write or read a journal

// If someone visits the front door, say hello!
app.get('/', (req, res) => {
  res.send('AI Quote Journal API is running!'); // Friendly hello message
});

// Open the door and start listening for friends!
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Tell us the door is open
}); 