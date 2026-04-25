import React from 'react';
import { motion } from 'framer-motion';

function Footer({ sections, contact, branding }) {
  const visibleSections = sections.filter(s => s.visible);

  const socials = [
    { label: 'Facebook',  url: contact.facebook },
    { label: 'LinkedIn',  url: contact.linkedin },
    { label: 'Instagram', url: contact.instagram },
    { label: 'GitHub',    url: contact.github },
  ];

  const logoContent = () => {
    if (branding && branding.logoUrl) {
      return (
        <img
          src={branding.logoUrl}
          alt="Logo"
          style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
      );
    }
    return branding && branding.logoText ? branding.logoText : 'AW.';
  };

  return (
    <footer style={{
      background: 'var(--dark2)',
      borderTop: '1px solid var(--dark4)',
      padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 3rem)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Top grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: '2.5rem',
          }}
        >

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
              {logoContent()}
            </div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 1.5vw, 0.72rem)',
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

          {/* Socials */}
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
              fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
              color: '#666',
              lineHeight: 1.7,
              wordBreak: 'break-all',
            }}>
              {contact.email}
              <br />
              {contact.location}
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'var(--dark4)',
          marginBottom: '1.5rem',
        }} />

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.62rem, 1.5vw, 0.7rem)',
            color: '#444',
            letterSpacing: '0.08em',
          }}>
            © {new Date().getFullYear()} Angelo Waterwitch. All Rights Reserved.
          </p>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.62rem, 1.5vw, 0.7rem)',
            color: '#444',
            letterSpacing: '0.08em',
          }}>
            Designed & Built by{' '}
            <span style={{ color: 'var(--cr-light)' }}>Angelo Waterwitch</span>
          </p>
        </motion.div>
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
        fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
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