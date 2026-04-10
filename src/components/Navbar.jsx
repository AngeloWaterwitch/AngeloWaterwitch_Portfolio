import React, { useState, useEffect } from 'react';

function Navbar({ sections, onAdminClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleSections = sections.filter(s => s.visible);

  const getBarTransform = (index, menuOpen) => {
    if (!menuOpen) return 'none';
    if (index === 0) return 'rotate(45deg) translate(5px, 5px)';
    if (index === 2) return 'rotate(-45deg) translate(5px, -5px)';
    return 'none';
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 900,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.2rem 3rem',
      background: scrolled ? 'rgba(10,10,10,0.97)' : 'rgba(10,10,10,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(220,30,60,0.15)',
      transition: 'background 0.3s ease',
    }}>

      {/* Logo */}
      <a href="#home" style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.1rem',
        fontWeight: 800,
        color: 'var(--cr-light)',
        letterSpacing: '0.08em',
      }}>
        AW.
      </a>

      {/* Desktop Links */}
      <ul style={{
        display: 'flex',
        gap: '2.5rem',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}>
        {visibleSections.map(s => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#aaa',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--cr-light)'}
              onMouseLeave={e => e.target.style.color = '#aaa'}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onAdminClick}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            padding: '0.4rem 1rem',
            border: '1px solid var(--cr-dim)',
            borderRadius: '2px',
            background: 'transparent',
            color: 'var(--cr-light)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--cr)';
            e.currentTarget.style.borderColor = 'var(--cr)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'var(--cr-dim)';
            e.currentTarget.style.color = 'var(--cr-light)';
          }}
        >
          Admin
        </button>

        {/* Burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            background: 'transparent',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: '24px',
              height: '2px',
              background: '#fff',
              borderRadius: '2px',
              transition: 'all 0.3s',
              transform: getBarTransform(i, menuOpen),
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(10,10,10,0.98)',
          borderBottom: '1px solid var(--dark4)',
          listStyle: 'none',
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          margin: 0,
        }}>
          {visibleSections.map(s => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--light)',
                }}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;