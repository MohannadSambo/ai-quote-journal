// === Header Component ===
// This is the colorful top bar for our app with navigation!

import React from 'react';

export default function Header({ onDashboard, onNewEntry, onLogout, isLoggedIn }) {
  return (
    <header
      style={{
        background: 'linear-gradient(90deg, #ffb347 0%, #ffcc33 100%)',
        padding: '20px 0',
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#333',
        letterSpacing: '2px',
        borderRadius: '0 0 20px 20px',
        marginBottom: 24,
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
      }}
    >
      ✨ AI Quote Journal ✨
      {isLoggedIn && (
        <nav style={{ marginTop: 10 }}>
          <button className="button-accent" onClick={onDashboard} style={{ marginRight: 8 }}>Dashboard</button>
          <button className="button-accent" onClick={onNewEntry} style={{ marginRight: 8 }}>New Entry</button>
          <button className="button-accent" onClick={onLogout}>Log Out</button>
        </nav>
      )}
    </header>
  );
}
