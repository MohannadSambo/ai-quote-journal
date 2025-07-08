import { MdNotes, MdList, MdBook, MdLibraryBooks, MdSettings } from 'react-icons/md';

export default function Sidebar() {
  return (
    <aside style={{
      background: '#fff',
      borderRight: '1px solid #eee',
      padding: '24px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh'
    }}>
      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" style={{ borderRadius: '50%', width: 64, height: 64, marginBottom: 16 }} />
      <div style={{ fontWeight: 'bold', marginBottom: 24 }}>Floyd Lawton</div>
      <input type="text" placeholder="Search notes..." style={{ width: '80%', marginBottom: 24, padding: 8, borderRadius: 8, border: '1px solid #eee' }} />
      <nav style={{ width: '100%' }}>
        <SidebarLink icon={<MdNotes />} label="My Notes" />
        <SidebarLink icon={<MdList />} label="To-do list" />
        <SidebarLink icon={<MdBook />} label="Projects" />
        <SidebarLink icon={<MdLibraryBooks />} label="Journal" />
        <SidebarLink icon={<MdLibraryBooks />} label="Reading List" />
      </nav>
      <button className="button-accent" style={{ marginTop: 'auto', marginBottom: 16, width: '80%' }}>+ Add new folder</button>
      <SidebarLink icon={<MdSettings />} label="Settings" />
    </aside>
  );
}

function SidebarLink({ icon, label }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px 24px',
      cursor: 'pointer',
      color: '#333',
      fontWeight: 500
    }}>
      <span style={{ marginRight: 12 }}>{icon}</span>
      {label}
    </div>
  );
}
