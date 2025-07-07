// === AI Quote Journal Frontend ===
// This is the main app for our magic journal! It helps you sign up, log in, and see your stories.

import React, { useState } from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  // This keeps track of which page we're on: 'login', 'signup', or 'dashboard'
  const [view, setView] = useState(
    localStorage.getItem('token') ? 'dashboard' : 'login'
  );

  // When a friend logs in, go to the dashboard
  const handleLogin = () => {
    setView('dashboard');
  };

  // When a friend logs out, go back to the login page
  const handleLogout = () => {
    localStorage.removeItem('token');
    setView('login');
  };

  // When a friend wants to write a new story
  const handleNewEntry = () => {
    alert('Next step: New Entry form!'); // Placeholder for next step
  };

  // When a friend wants to see a story
  const handleViewEntry = (id) => {
    alert(`Next step: View entry #${id}`); // Placeholder for next step
  };

  // Show the right page based on what the friend is doing
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>AI Quote Journal</h1>
      {view === 'login' && (
        <Login onLogin={handleLogin} onSwitch={() => setView('signup')} />
      )}
      {view === 'signup' && (
        <SignUp onSwitch={() => setView('login')} />
      )}
      {view === 'dashboard' && (
        <Dashboard
          onLogout={handleLogout}
          onNewEntry={handleNewEntry}
          onViewEntry={handleViewEntry}
        />
      )}
    </div>
  );
}

export default App;
