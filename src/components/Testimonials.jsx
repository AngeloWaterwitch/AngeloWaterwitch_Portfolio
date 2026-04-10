import React from 'react';

function Testimonials({ testimonials }) {
  return (
    <section id="testimonials" style={{
      padding: '7rem 3rem',
      background: 'var(--dark2)',
    }}>

      {/* Section tag */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--cr-light)',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        marginBottom: '1rem',
      }}>
        Social Proof
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 800,
        lineHeight: 1.05,
        marginBottom: '1rem',
      }}>
        What Clients <span style={{ color: 'var(--cr-light)' }}>Say</span>
      </h2>

      {/* Divider */}
      <div style={{
        width: '3rem',
        height: '2px',
        background: 'var(--cr)',
        marginBottom: '3rem',
      }} />

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
        gap: '1.5rem',
      }}>
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--dark3)',
        border: `1px solid ${hovered ? 'var(--cr-dim)' : 'var(--dark4)'}`,
        borderRadius: '2px',
        padding: '2rem',
        position: 'relative',
        transition: 'all 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Large quote mark */}
      <div style={{
        position: 'absolute',
        top: '0.5rem',
        right: '1.5rem',
        fontFamily: 'Georgia, serif',
        fontSize: '5rem',
        lineHeight: 1,
        color: hovered ? 'var(--cr-dim)' : 'rgba(255,255,255,0.04)',
        transition: 'color 0.3s',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        "
      </div>

      {/* Quote */}
      <p style={{
        fontSize: '0.95rem',
        color: '#aaa',
        lineHeight: 1.7,
        fontStyle: 'italic',
        marginBottom: '1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {testimonial.quote}
      </p>

      {/* Divider */}
      <div style={{
        width: '2rem',
        height: '1px',
        background: 'var(--cr-dim)',
        marginBottom: '1rem',
      }} />

      {/* Author */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
      }}>

        {/* Avatar circle with initials */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'var(--cr-dim)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--cr-light)',
          flexShrink: 0,
        }}>
          {testimonial.author.split(' ').map(n => n[0]).join('')}
        </div>

        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.9rem',
            color: 'var(--light)',
          }}>
            {testimonial.author}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: '#666',
            marginTop: '0.2rem',
            letterSpacing: '0.05em',
          }}>
            {testimonial.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;