import React from 'react';

function About({ about }) {
  return (
    <section id="about" style={{
      padding: '7rem 3rem',
      background: 'var(--dark2)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '5rem',
      alignItems: 'center',
    }}>

      {/* Left — Image side */}
      <div style={{ position: 'relative' }}>

        {/* Decorative top-right border accent */}
        <div style={{
          position: 'absolute',
          top: '-1rem',
          right: '-1rem',
          width: '5rem',
          height: '5rem',
          border: '2px solid var(--cr)',
          borderRadius: '2px',
          opacity: 0.4,
          zIndex: 0,
        }} />

        {/* Decorative bottom-left filled accent */}
        <div style={{
          position: 'absolute',
          bottom: '-1rem',
          left: '-1rem',
          width: '3rem',
          height: '3rem',
          background: 'var(--cr)',
          borderRadius: '2px',
          opacity: 0.3,
          zIndex: 0,
        }} />

        {/* Image frame */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3 / 4',
          background: 'var(--dark3)',
          border: '1px solid var(--dark4)',
          borderRadius: '2px',
          overflow: 'hidden',
          zIndex: 1,
        }}>
          <img
            src="/images/gelo.png"
            alt="Angelo Waterwitch"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={e => {
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Gradient overlay at bottom */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--cr-dim) 0%, transparent 50%)',
            zIndex: 2,
          }} />
        </div>
      </div>

      {/* Right — Text side */}
      <div>

        {/* Section tag */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--cr-light)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Who I Am
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          marginBottom: '1rem',
        }}>
          About{' '}
          <span style={{ color: 'var(--cr-light)' }}>Me</span>
        </h2>

        {/* Divider */}
        <div style={{
          width: '3rem',
          height: '2px',
          background: 'var(--cr)',
          marginBottom: '2rem',
        }} />

        {/* Bio paragraphs */}
        <p style={{
          color: '#999',
          lineHeight: 1.8,
          marginBottom: '1.2rem',
          fontSize: '1rem',
        }}>
          {about.bio1}
        </p>

        <p style={{
          color: '#999',
          lineHeight: 1.8,
          marginBottom: '2rem',
          fontSize: '1rem',
        }}>
          {about.bio2}
        </p>

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}>
          {[
            { value: about.years,    label: 'Years Experience' },
            { value: about.projects, label: 'Projects Completed' },
            { value: about.clients,  label: 'Happy Clients' },
            { value: about.standing, label: 'Academic Standing' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'var(--dark3)',
              border: '1px solid var(--dark4)',
              padding: '1.2rem',
              borderRadius: '2px',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--cr-light)',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: '#666',
                letterSpacing: '0.1em',
                marginTop: '0.2rem',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;