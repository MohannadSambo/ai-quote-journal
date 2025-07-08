// === Single Entry Page ===
// This page shows one story in full!

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Components/Card';

export default function SingleEntry({ entryId, onBack, onEdit, onDelete }) {
  const [entry, setEntry] = useState(null);
  const [message, setMessage] = useState('');

  // Get the story from the server when the page loads
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:4000/journal/${entryId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEntry(res.data);
      } catch (err) {
        setMessage('Could not load the story.');
      }
    };
    fetchEntry();
  }, [entryId]);

  if (message) return <div style={{ textAlign: 'center' }}><p>{message}</p><button className="button-accent" onClick={onBack}>Back</button></div>;
  if (!entry) return <div style={{ textAlign: 'center' }}>Loading...</div>;

  return (
    <Card>
      <h2>Your Story</h2>
      <div style={{ border: '1px solid #ccc', padding: 16, marginBottom: 16 }}>
        <p>{entry.entryText}</p>
        {/* Show tags as chips */}
        {(entry.tags && entry.tags.length > 0) && (
          <div style={{ margin: '8px 0' }}>
            {entry.tags.map(tag => (
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
        )}
        {/* In the future, show the AI response here */}
        {entry.aiResponse && (
          <div style={{ marginTop: 16, color: 'blue' }}>
            <strong>AI says:</strong> {entry.aiResponse}
          </div>
        )}
      </div>
      <button className="button-accent" onClick={onBack} style={{ marginRight: 8 }}>Back to Dashboard</button>
      <button className="button-accent" onClick={() => onEdit(entry)} style={{ marginRight: 8 }}>Edit</button>
      <button className="button-accent" onClick={() => onDelete(entry.id)} style={{ color: 'red' }}>Delete</button>
    </Card>
  );
}
