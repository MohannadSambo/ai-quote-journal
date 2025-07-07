import React, { useState } from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  // 'login', 'signup', or 'dashboard'
  const [view, setView] = useState(
    localStorage.getItem('token') ? 'dashboard' : 'login'
  );

  const handleLogin = () => {
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setView('login');
  };

  const handleNewEntry = () => {
    alert('Next step: New Entry form!'); // Placeholder for next step
  };

  const handleViewEntry = (id) => {
    alert(`Next step: View entry #${id}`); // Placeholder for next step
  };

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
