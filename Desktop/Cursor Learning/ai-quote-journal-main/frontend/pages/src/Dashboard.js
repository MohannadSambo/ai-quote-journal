import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard({ onLogout, onNewEntry, onViewEntry }) {
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');

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
      <button onClick={onNewEntry} style={{ marginBottom: 16 }}>Write New Entry</button>
      <button onClick={onLogout} style={{ marginLeft: 8 }}>Log Out</button>
      {message && <p>{message}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {entries.map(entry => (
          <li key={entry.id} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
            <div>
              <strong>{entry.entryText.slice(0, 30)}{entry.entryText.length > 30 ? '...' : ''}</strong>
            </div>
            <div>
              <button onClick={() => onViewEntry(entry.id)}>View</button>
            </div>
          </li>
        ))}
      </ul>
      {entries.length === 0 && <p>No entries yet. Write your first one!</p>}
    </div>
  );
}
