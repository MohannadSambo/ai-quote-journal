// === Edit Entry Page ===
// This page lets friends change their story!

import React, { useState } from 'react';
import axios from 'axios';
import Card from '../Components/Card';

export default function EditEntry({ entry, onSave, onCancel }) {
  const [entryText, setEntryText] = useState(entry.entryText);
  const [tags, setTags] = useState(entry.tags ? entry.tags.map(t => t.name).join(', ') : '');
  const [message, setMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:4000/journal/${entry.id}`,
        { entryText, tags: tags.split(',').map(t => t.trim()).filter(Boolean) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Your story was updated!');
      onSave();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Oops! Something went wrong.');
    }
  };

  return (
    <Card>
      <h2>Edit Your Story</h2>
      <form onSubmit={handleSave}>
        <textarea
          value={entryText}
          onChange={e => setEntryText(e.target.value)}
          required
          rows={6}
        />
        <br />
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