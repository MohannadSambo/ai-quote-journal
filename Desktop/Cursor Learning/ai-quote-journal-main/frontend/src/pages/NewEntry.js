// === New Entry Page ===
// This page lets friends write a new story for their journal!

import React, { useState } from 'react';
import axios from 'axios';
import Card from '../Components/Card';

export default function NewEntry({ onSave, onCancel }) {
  // This is where we keep the story the friend is writing
  const [entryText, setEntryText] = useState('');
  const [tags, setTags] = useState(''); // New state for tags (comma-separated string)
  const [message, setMessage] = useState('');

  // This happens when you click the Save button
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:4000/journal',
        { entryText, tags: tags.split(',').map(t => t.trim()).filter(Boolean) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Your story was saved!');
      setEntryText('');
      setTags('');
      onSave(); // Go back to the dashboard
    } catch (err) {
      setMessage(err.response?.data?.error || 'Oops! Something went wrong.');
    }
  };

  return (
    <Card>
      <h2>Write a New Story</h2>
      <form onSubmit={handleSave}>
        <textarea
          placeholder="Type your story here..."
          value={entryText}
          onChange={e => setEntryText(e.target.value)}
          required
          rows={6}
        />
        <br />
        {/* Tags input */}
        <input
          type="text"
          placeholder="Tags (comma separated, e.g. happy,school)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 8, border: '1px solid #444', background: '#222', color: '#fff' }}
        />
        <br />
        <button className="button-accent" type="submit" style={{ marginRight: 8 }}>Save</button>
        <button className="button-accent" type="button" onClick={onCancel}>Cancel</button>
      </form>
      <p>{message}</p>
    </Card>
  );
}
