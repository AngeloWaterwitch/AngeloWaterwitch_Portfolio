import React from 'react';

function Services({ services }) {
  return (
    <section id="services" style={{
      padding: '7rem 3rem',
      background: 'var(--dark)',
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
        What I Offer
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 800,
        lineHeight: 1.05,
        marginBottom: '1rem',
      }}>
        My <span style={{ color: 'var(--cr-light)' }}>Services</span>
      </h2>

      {/* Divider */}
      <div style={{
        width: '3rem',
        height: '2px',
        background: 'var(--cr)',
        marginBottom: '3rem',
      }} />

      {/* Services list */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        border: '1px solid var(--dark4)',
      }}>
        {services.map((service, i) => (
          <ServiceItem key={i} service={service} index={i} total={services.length} />
        ))}
      </div>
    </section>
  );
}

function ServiceItem({ service, index, total }) {
  const [hovered, setHovered] = React.useState(false);

  const isLast = index === total - 1;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '2.5rem',
        background: hovered ? 'var(--dark3)' : 'var(--dark2)',
        borderRight: isLast ? 'none' : '1px solid var(--dark4)',
        borderLeft: 'none',
        transition: 'background 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Crimson top accent line on hover */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--cr)',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.3s ease',
      }} />

      {/* Number */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--cr)',
        letterSpacing: '0.1em',
        marginBottom: '1.2rem',
      }}>
        {service.num}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.4rem',
        fontWeight: 700,
        color: hovered ? 'var(--cr-light)' : 'var(--light)',
        marginBottom: '1rem',
        transition: 'color 0.2s',
      }}>
        {service.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '0.9rem',
        color: '#777',
        lineHeight: 1.7,
      }}>
        {service.desc}
      </p>
    </div>
  );
}

export default Services;