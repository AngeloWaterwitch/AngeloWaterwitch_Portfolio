import React, { useState } from 'react';

function RestoreDefaults({ onRestore }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [restored, setRestored] = useState(false);

  const handleRestore = () => {
    onRestore();
    setShowConfirm(false);
    setRestored(true);
    setTimeout(() => setRestored(false), 3000);
  };

  return (
    <div style={{
      background: 'var(--dark3)',
      border: '1px solid var(--dark4)',
      borderRadius: '2px',
      padding: '1.5rem',
      marginBottom: '1rem',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1rem',
        marginBottom: '0.5rem',
        color: 'var(--light)',
      }}>
        Restore Default Content
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: '#666',
        lineHeight: 1.6,
        marginBottom: '1.2rem',
      }}>
        This will reset all site content back to the original defaults.
        Your messages and pending testimonials will not be affected.
        This cannot be undone.
      </p>

      {restored && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: '#4caf50',
          marginBottom: '1rem',
          letterSpacing: '0.08em',
        }}>
          ✓ Site content restored to defaults.
        </div>
      )}

      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          style={{
            padding: '0.6rem 1.2rem',
            background: 'transparent',
            border: '1px solid #444',
            color: '#888',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: '1px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Restore Defaults
        </button>
      ) : (
        <div style={{
          background: 'var(--dark)',
          border: '1px solid hsl(348,40%,25%)',
          borderRadius: '2px',
          padding: '1rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--cr-light)',
            marginBottom: '1rem',
            lineHeight: 1.6,
          }}>
            Are you sure? This will overwrite all your current content.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button
              onClick={handleRestore}
              style={{
                padding: '0.6rem 1.2rem',
                background: 'var(--cr)',
                border: 'none',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '1px',
                cursor: 'pointer',
              }}
            >
              Yes, Restore
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              style={{
                padding: '0.6rem 1.2rem',
                background: 'transparent',
                border: '1px solid #444',
                color: '#888',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '1px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestoreDefaults;