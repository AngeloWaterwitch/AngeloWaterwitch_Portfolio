import React from 'react';

function Hero({ hero }) {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0 3rem',
      paddingTop: '5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(220,30,60,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(220,30,60,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 80% at 80% 50%, hsl(348,60%,12%) 0%, transparent 70%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>

        {/* Tag line */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--cr-light)',
          letterSpacing: '0.2em',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
        }}>
          <span style={{
            display: 'inline-block',
            width: '2rem',
            height: '1px',
            background: 'var(--cr-light)',
          }} />
          {hero.role}
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 800,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem',
        }}>
          {hero.name.split(' ').map((word, i) => (
            <span key={i} style={{
              display: 'block',
              color: i === 1 ? 'var(--cr-light)' : 'var(--light)',
            }}>
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.1rem',
          color: '#888',
          maxWidth: '500px',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
          fontWeight: 400,
        }}>
          {hero.sub}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <HeroButton
            href={hero.resumeUrl}
            download
            primary
            label="Download CV"
          />
          <HeroButton
            href="#contact"
            label="Get In Touch"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <div style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, var(--cr), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: '#555',
          letterSpacing: '0.15em',
        }}>
          SCROLL
        </span>
      </div>
    </section>
  );
}

function HeroButton({ href, download, primary, label }) {
  const [hovered, setHovered] = React.useState(false);

  const getStyle = () => {
    if (primary) {
      return {
        padding: '0.85rem 2rem',
        background: hovered ? 'transparent' : 'var(--cr)',
        color: hovered ? 'var(--cr-light)' : '#fff',
        fontFamily: 'var(--font-display)',
        fontSize: '0.85rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        borderRadius: '2px',
        border: '1px solid var(--cr)',
        transition: 'all 0.2s',
        display: 'inline-block',
      };
    }
    return {
      padding: '0.85rem 2rem',
      background: 'transparent',
      color: hovered ? 'var(--cr-light)' : 'var(--light)',
      fontFamily: 'var(--font-display)',
      fontSize: '0.85rem',
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      borderRadius: '2px',
      border: '1px solid ' + (hovered ? 'var(--cr-light)' : '#444'),
      transition: 'all 0.2s',
      display: 'inline-block',
    };
  };

  return (
    <a
      href={href}
      download={download}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={getStyle()}
    >
      {label}
    </a>
  );
}

export default Hero;