import React from 'react';
import { motion } from 'framer-motion';

function Hero({ hero }) {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
      paddingTop: 'clamp(5rem, 10vw, 8rem)',
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
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '800px',
        width: '100%',
      }}>

        {/* Tag line */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.65rem, 2vw, 0.8rem)',
            color: 'var(--cr-light)',
            letterSpacing: '0.2em',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
          }}
        >
          <span style={{
            display: 'inline-block',
            width: '2rem',
            height: '1px',
            background: 'var(--cr-light)',
            flexShrink: 0,
          }} />
          {hero.role}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 10vw, 7rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
          }}
        >
          {hero.name.split(' ').map((word, i) => (
            <span key={i} style={{
              display: 'block',
              color: i === 1 ? 'var(--cr-light)' : 'var(--light)',
            }}>
              {word}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
            color: '#888',
            maxWidth: '500px',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            fontWeight: 400,
          }}
        >
          {hero.sub}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {hero.resumeEnabled !== false && (
            <HeroButton
              href={hero.resumeUrl}
              download
              primary
              label={hero.resumeLabel || 'Download CV'}
            />
          )}
          <HeroButton
            href="#contact"
            label="Get In Touch"
          />
        </motion.div>
      </div>

      {/* Scroll indicator — hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
        className="hero-scroll-indicator"
      >
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
      </motion.div>
    </section>
  );
}

function HeroButton({ href, download, primary, label }) {
  const [hovered, setHovered] = React.useState(false);

  const getStyle = () => {
    if (primary) {
      return {
        padding: 'clamp(0.7rem, 2vw, 0.85rem) clamp(1.2rem, 3vw, 2rem)',
        background: hovered ? 'transparent' : 'var(--cr)',
        color: hovered ? 'var(--cr-light)' : '#fff',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        borderRadius: '2px',
        border: '1px solid var(--cr)',
        transition: 'all 0.2s',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      };
    }
    return {
      padding: 'clamp(0.7rem, 2vw, 0.85rem) clamp(1.2rem, 3vw, 2rem)',
      background: 'transparent',
      color: hovered ? 'var(--cr-light)' : 'var(--light)',
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      borderRadius: '2px',
      border: '1px solid ' + (hovered ? 'var(--cr-light)' : '#444'),
      transition: 'all 0.2s',
      display: 'inline-block',
      whiteSpace: 'nowrap',
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