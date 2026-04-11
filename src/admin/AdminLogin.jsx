import React, { useState } from 'react';

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (password === 'Them@ng3lo') {
      onLogin();
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--dark)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
    }}>

      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.8rem',
        fontWeight: 800,
      }}>
        Admin <span style={{ color: 'var(--cr-light)' }}>Dashboard</span>
      </div>

      <div style={{
        background: 'var(--dark3)',
        border: '1px solid var(--dark4)',
        borderRadius: '2px',
        padding: '2rem',
        width: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
          style={{
            width: '100%',
            background: 'var(--dark)',
            border: '1px solid var(--dark4)',
            color: 'var(--light)',
            padding: '0.7rem 1rem',
            fontFamily: 'var(--font-display)',
            fontSize: '0.9rem',
            borderRadius: '1px',
            outline: 'none',
          }}
        />

        {error && (
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--cr-light)',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          style={{
            padding: '0.8rem',
            background: 'var(--cr)',
            color: '#fff',
            border: 'none',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            borderRadius: '1px',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          Enter Dashboard
        </button>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: '#444',
          textAlign: 'center',
        }}>
          Demo password: admin123
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;