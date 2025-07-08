export default function NotesList({ notes, onSelectNote, onAddNote, selectedNoteId }) {
  return (
    <section style={{
      background: '#fafbfc',
      borderRight: '1px solid #eee',
      padding: 24,
      overflowY: 'auto'
    }}>
      <button className="button-accent" style={{ width: '100%', marginBottom: 16 }} onClick={onAddNote}>
        + Add new note
      </button>
      <div style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 16 }}>My Notes</div>
      {notes.map(note => (
        <div
          key={note.id}
          onClick={() => onSelectNote(note.id)}
          style={{
            background: note.id === selectedNoteId ? '#e6f7ff' : '#fff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>
            {new Date(note.createdAt).toLocaleDateString()}
          </div>
          <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
            {note.entryText.slice(0, 30) || 'Untitled'}
          </div>
          <div style={{ fontSize: 14, color: '#555' }}>
            {note.entryText.slice(0, 60)}
          </div>
        </div>
      ))}
    </section>
  );
}
