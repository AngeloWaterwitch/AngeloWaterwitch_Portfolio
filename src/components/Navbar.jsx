import React, { useState, useEffect } from 'react';

function Navbar({ sections, onAdminClick, branding }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const visibleSections = sections.filter(s => s.visible);

  const getBarTransform = (index) => {
    if (!menuOpen) return 'none';
    if (index === 0) return 'rotate(45deg) translate(5px, 5px)';
    if (index === 2) return 'rotate(-45deg) translate(5px, -5px)';
    return 'none';
  };

  const logoContent = () => {
    if (branding && branding.logoUrl) {
      return (
        <img
          src={branding.logoUrl}
          alt="Logo"
          style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
      );
    }
    return branding && branding.logoText ? branding.logoText : 'AW.';
  };

  return (
    <React.Fragment>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '1rem 1.5rem' : '1.2rem 3rem',
        background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.85)',
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
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 1001,
        }}>
          {logoContent()}
        </a>

        {/* Desktop Links */}
        {!isMobile && (
          <ul style={{
            display: 'flex',
            gap: '2.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}>
            {visibleSections.map(s => (
              <li key={s.id}>
                <NavLink href={'#' + s.id} label={s.label} />
              </li>
            ))}
          </ul>
        )}

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {!isMobile && (
            <AdminButton onClick={onAdminClick} />
          )}

          {/* Burger */}
          {isMobile && (
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
                zIndex: 1001,
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
                  transform: getBarTransform(i),
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 899,
          background: 'rgba(10,10,10,0.98)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          animation: 'fadeIn 0.2s ease',
        }}>
          {visibleSections.map(s => (
            <a
              key={s.id}
              href={'#' + s.id}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--light)',
                letterSpacing: '-0.02em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.target.style.color = 'var(--cr-light)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--light)'; }}
            >
              {s.label}
            </a>
          ))}
          <button
            onClick={onAdminClick}
            style={{
              marginTop: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              padding: '0.6rem 1.5rem',
              border: '1px solid var(--cr-dim)',
              borderRadius: '2px',
              background: 'transparent',
              color: 'var(--cr-light)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Admin
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

function NavLink({ href, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: hovered ? 'var(--cr-light)' : '#aaa',
        transition: 'color 0.2s',
      }}
    >
      {label}
    </a>
  );
}

function AdminButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        padding: '0.4rem 1rem',
        border: '1px solid var(--cr-dim)',
        borderRadius: '2px',
        background: hovered ? 'var(--cr)' : 'transparent',
        color: hovered ? '#fff' : 'var(--cr-light)',
        borderColor: hovered ? 'var(--cr)' : 'var(--cr-dim)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        transition: 'all 0.2s',
        cursor: 'pointer',
      }}
    >
      Admin
    </button>
  );
}

export default Navbar;