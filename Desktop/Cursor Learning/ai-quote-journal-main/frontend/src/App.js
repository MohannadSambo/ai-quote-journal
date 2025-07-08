// === AI Quote Journal Frontend ===
// This is the main app for our magic journal! It helps you sign up, log in, and see your stories.

import React, { useState, useEffect } from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewEntry from './pages/NewEntry';
import SingleEntry from './pages/SingleEntry';
import EditEntry from './pages/EditEntry';
import axios from 'axios';
import Header from './Components/Header';
import './App.css';

function App() {
  // This keeps track of which page we're on: 'login', 'signup', or 'dashboard'
  const [view, setView] = useState('login');

  const [refreshDashboard, setRefreshDashboard] = useState(false);

  const [selectedEntryId, setSelectedEntryId] = useState(null);

  const [editingEntry, setEditingEntry] = useState(null);

  // State for all notes and the selected note
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  // Fetch notes from your backend when the app loads
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:4000/journal', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data);
      if (res.data.length > 0 && !selectedNoteId) {
        setSelectedNoteId(res.data[0].id);
      }
    };
    fetchNotes();
  }, []);

  // Navigation handlers
  const handleLogin = () => setView('dashboard');
  const handleLogout = () => {
    localStorage.removeItem('token');
    setView('login');
  };
  const handleNewEntry = () => setView('newEntry');
  const handleViewEntry = (id) => {
    setSelectedEntryId(id);
    setView('singleEntry');
  };
  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setView('editEntry');
  };
  const handleBackToDashboard = () => {
    setView('dashboard');
    setSelectedEntryId(null);
  };

  const handleSaveEntry = () => {
    setRefreshDashboard(r => !r); // Toggle to trigger refresh
    setView('dashboard');
  };

  const handleCancelEntry = () => {
    setView('dashboard');
  };

  const handleSaveEdit = () => {
    setEditingEntry(null);
    setView('dashboard');
    setRefreshDashboard(r => !r); // Refresh dashboard after edit
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
    setView('singleEntry');
  };

  const handleDeleteEntry = async (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:4000/journal/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setView('dashboard');
        setSelectedEntryId(null);
        setRefreshDashboard(r => !r); // Refresh dashboard after delete
      } catch (err) {
        alert('Could not delete the story.');
      }
    }
  };

  // Handler to select a note
  const handleSelectNote = (id) => setSelectedNoteId(id);

  // Handler to add a new note (show a form or modal, or just add a blank note)
  const handleAddNote = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      'http://localhost:4000/journal',
      { entryText: 'New Note' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNotes([res.data, ...notes]);
    setSelectedNoteId(res.data.id);
  };

  // Handler to update a note
  const handleUpdateNote = async (id, newText) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:4000/journal/${id}`, { entryText: newText }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNotes(notes.map(note => note.id === id ? { ...note, entryText: newText } : note));
  };

  // Handler to delete a note
  const handleDeleteNote = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:4000/journal/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
    setSelectedNoteId(newNotes.length > 0 ? newNotes[0].id : null);
  };

  // Find the selected note
  const selectedNote = notes.find(note => note.id === selectedNoteId);

  const isLoggedIn = !!localStorage.getItem('token') && view !== 'login' && view !== 'signup';

  // Show the right page based on what the friend is doing
  return (
    <div>
      <Header
        onDashboard={handleBackToDashboard}
        onNewEntry={handleNewEntry}
        onLogout={handleLogout}
        isLoggedIn={view !== 'login' && view !== 'signup'}
      />
      {view === 'login' && <Login onLogin={handleLogin} onSwitch={() => setView('signup')} />}
      {view === 'signup' && <SignUp onSwitch={() => setView('login')} />}
      {view === 'dashboard' && (
        <Dashboard
          onLogout={handleLogout}
          onNewEntry={handleNewEntry}
          onViewEntry={handleViewEntry}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
          onSaveEntry={handleSaveEntry}
          onCancelEntry={handleCancelEntry}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onSelectNote={handleSelectNote}
          onAddNote={handleAddNote}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
          notes={notes}
          selectedNoteId={selectedNoteId}
          selectedEntryId={selectedEntryId}
          editingEntry={editingEntry}
          selectedNote={selectedNote}
        />
      )}
      {view === 'newEntry' && (
        <NewEntry onSave={handleBackToDashboard} onCancel={handleBackToDashboard} />
      )}
      {view === 'singleEntry' && (
        <SingleEntry
          onBack={handleBackToDashboard}
          onEdit={handleEditEntry}
          onDelete={handleDeleteEntry}
          entryId={selectedEntryId}
        />
      )}
      {view === 'editEntry' && (
        <EditEntry
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          entry={editingEntry}
        />
      )}
    </div>
  );
}

export default App;
