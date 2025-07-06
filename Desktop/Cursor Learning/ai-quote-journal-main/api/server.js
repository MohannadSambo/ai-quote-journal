const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('../auth/auth.routes');
const journalRoutes = require('../journal/journal.routes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/journal', journalRoutes);

app.get('/', (req, res) => {
  res.send('AI Quote Journal API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 