import React from 'react';

export default function Toggle({ checked, onChange }) {
  return (
    <label style={{ display: 'inline-block', position: 'relative', width: 50, height: 24 }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      <span style={{
        position: 'absolute',
        cursor: 'pointer',
        top: 0, left: 0, right: 0, bottom: 0,
        background: checked ? '#ffb347' : '#555',
        borderRadius: 24,
        transition: 'background 0.2s'
      }} />
      <span style={{
        position: 'absolute',
        left: checked ? 26 : 2,
        top: 2,
        width: 20,
        height: 20,
        background: '#fff',
        borderRadius: '50%',
        transition: 'left 0.2s'
      }} />
    </label>
  );
}
