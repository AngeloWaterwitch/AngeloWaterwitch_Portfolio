import React from 'react';

function Footer({ sections, contact }) {
  const visibleSections = sections.filter(s => s.visible);

  const socials = [
    { label: 'Facebook',  url: contact.facebook },
    { label: 'LinkedIn',  url: contact.linkedin },
    { label: 'Instagram', url: contact.instagram },
    { label: 'GitHub',    url: contact.github },
  ];

  return (
    <footer style={{
      background: 'var(--dark2)',
      borderTop: '1px solid var(--dark4)',
      padding: '3rem',
    }}>

      {/* Top row */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '2rem',
        flexWrap: 'wrap',
        marginBottom: '2.5rem',
      }}>

        {/* Logo + tagline */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--cr-light)',
            letterSpacing: '0.08em',
            marginBottom: '0.5rem',
          }}>
            AW.
          </div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: '#555',
            letterSpacing: '0.08em',
            maxWidth: '220px',
            lineHeight: 1.6,
          }}>
            Software & Design Engineer based in Cape Town, South Africa.
          </p>
        </div>

        {/* Nav links */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: '#444',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Navigation
          </div>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}>
            {visibleSections.map(s => (
              <li key={s.id}>
                <FooterLink href={'#' + s.id} label={s.label} />
              </li>
            ))}
          </ul>
        </div>

        {/* Social links */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: '#444',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Socials
          </div>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}>
            {socials.map((s, i) => (
              <li key={i}>
                <FooterLink href={s.url} label={s.label} external />
              </li>
            ))}
          </ul>
        </div>

        {/* Contact snippet */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: '#444',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Contact
          </div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#666',
            lineHeight: 1.7,
          }}>
            {contact.email}
            <br />
            {contact.location}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        width: '100%',
        height: '1px',
        background: 'var(--dark4)',
        marginBottom: '1.5rem',
      }} />

      {/* Bottom row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#444',
          letterSpacing: '0.08em',
        }}>
          © 2024 Angelo Waterwitch. All Rights Reserved.
        </p>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#444',
          letterSpacing: '0.08em',
        }}>
          Designed & Built by{' '}
          <span style={{ color: 'var(--cr-light)' }}>Angelo Waterwitch</span>
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ href, label, external }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: hovered ? 'var(--cr-light)' : '#666',
        letterSpacing: '0.08em',
        transition: 'color 0.2s',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </a>
  );
}

export default Footer;