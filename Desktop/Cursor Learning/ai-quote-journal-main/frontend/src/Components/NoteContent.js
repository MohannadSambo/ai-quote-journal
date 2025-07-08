export default function NoteContent({ note, onUpdateNote, onDeleteNote }) {
  if (!note) return <main style={{ padding: 40 }}>No note selected.</main>;

  // Add editing logic as needed
  return (
    <main style={{ background: '#fff', padding: 40, overflowY: 'auto' }}>
      <div style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>
        {note.entryText.slice(0, 30) || 'Untitled'}
      </div>
      <div style={{ color: '#888', marginBottom: 16 }}>
        {new Date(note.createdAt).toLocaleString()}
      </div>
      <div style={{ color: '#444', fontSize: 16, marginBottom: 24 }}>
        {note.entryText}
      </div>
      <button className="button-accent" onClick={() => onUpdateNote(note.id, prompt('Edit note:', note.entryText))}>
        Edit
      </button>
      <button className="button-accent" style={{ marginLeft: 8, color: 'red' }} onClick={() => onDeleteNote(note.id)}>
        Delete
      </button>
    </main>
  );
}
