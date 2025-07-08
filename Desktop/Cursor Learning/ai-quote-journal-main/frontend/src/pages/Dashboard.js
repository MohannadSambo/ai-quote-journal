// === Dashboard Page ===
// This page shows all your stories and lets you write new ones!

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Components/Card';

export default function Dashboard({ onLogout, onNewEntry, onViewEntry, refresh }) {
  // This is where we keep all the stories
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState(''); // New state for search
  const [tagFilter, setTagFilter] = useState(''); // New state for tag filter

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
  }, [refresh]);

  // Collect all unique tags
  const allTags = Array.from(new Set(entries.flatMap(entry => (entry.tags || []).map(tag => tag.name))));

  // Filter entries based on search and tag
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.entryText.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !tagFilter || (entry.tags && entry.tags.some(tag => tag.name === tagFilter));
    return matchesSearch && matchesTag;
  });

  return (
    <Card>
      <h2>Your Journal Entries</h2>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search your stories..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', marginBottom: 16, padding: 8, borderRadius: 8, border: '1px solid #444', background: '#222', color: '#fff' }}
      />
      {/* Tag filter bar */}
      {allTags.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 8 }}>Filter by tag:</span>
          <button
            className="button-accent"
            style={{ marginRight: 8, background: !tagFilter ? '#ffb347' : '#444', color: !tagFilter ? '#222' : '#fff' }}
            onClick={() => setTagFilter('')}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className="button-accent"
              style={{ marginRight: 8, background: tagFilter === tag ? '#ffb347' : '#444', color: tagFilter === tag ? '#222' : '#fff' }}
              onClick={() => setTagFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      {message && <p>{message}</p>}
      {/* Show all the stories in a list */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredEntries.map(entry => (
          <li key={entry.id} style={{ border: '1px solid #ccc', margin: 8, padding: 8, borderRadius: 8 }}>
            <div>
              <strong>{entry.entryText.slice(0, 30)}{entry.entryText.length > 30 ? '...' : ''}</strong>
            </div>
            {/* Show tags as chips */}
            <div style={{ margin: '8px 0' }}>
              {(entry.tags || []).map(tag => (
                <span
                  key={tag.id}
                  style={{
                    display: 'inline-block',
                    background: '#444',
                    color: '#fff',
                    borderRadius: 12,
                    padding: '2px 12px',
                    marginRight: 6,
                    fontSize: 13
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <div>
              {/* Button to view a story */}
              <button className="button-accent" onClick={() => onViewEntry(entry.id)}>View</button>
            </div>
          </li>
        ))}
      </ul>
      {filteredEntries.length === 0 && <p>No entries found. Try a different search or tag!</p>}
    </Card>
  );
}
