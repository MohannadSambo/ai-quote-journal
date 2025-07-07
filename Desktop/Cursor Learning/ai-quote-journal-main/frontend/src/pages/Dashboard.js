// === Dashboard Page ===
// This page shows all your stories and lets you write new ones!

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard(props) {
  // This is where we keep all the stories
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');

  // When the page loads, get all the stories from the server
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/journal', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEntries(res.data);
      } catch (err) {
        setMessage('Could not load entries. Please log in again.');
      }
    };
    fetchEntries();
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: 'auto', textAlign: 'center' }}>
      <h2>Your Journal Entries</h2>
      {/* Button to write a new story */}
      <button onClick={props.onNewEntry} style={{ marginBottom: 16 }}>Write New Entry</button>
      {/* Button to log out */}
      <button onClick={props.onLogout} style={{ marginLeft: 8 }}>Log Out</button>
      {message && <p>{message}</p>}
      {/* Show all the stories in a list */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {entries.map(entry => (
          <li key={entry.id} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
            <div>
              <strong>{entry.entryText.slice(0, 30)}{entry.entryText.length > 30 ? '...' : ''}</strong>
            </div>
            <div>
              {/* Button to view a story */}
              <button onClick={() => props.onViewEntry(entry.id)}>View</button>
            </div>
          </li>
        ))}
      </ul>
      {entries.length === 0 && <p>No entries yet. Write your first one!</p>}
    </div>
  );
}
