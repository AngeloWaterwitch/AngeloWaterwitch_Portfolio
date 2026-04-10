import React from 'react';

function Skills({ skills }) {
  return (
    <section id="skills" style={{
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
        What I Use
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 800,
        lineHeight: 1.05,
        marginBottom: '1rem',
      }}>
        My <span style={{ color: 'var(--cr-light)' }}>Skills</span>
      </h2>

      {/* Divider */}
      <div style={{
        width: '3rem',
        height: '2px',
        background: 'var(--cr)',
        marginBottom: '1.5rem',
      }} />

      {/* Description */}
      <p style={{
        color: '#888',
        fontSize: '1rem',
        lineHeight: 1.7,
        maxWidth: '550px',
        marginBottom: '3rem',
      }}>
        I diversify my skillset through various coding languages and design
        tools to produce the best products for my clients.
      </p>

      {/* Skills grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '1rem',
      }}>
        {skills.map((skill, i) => (
          <SkillCard key={i} skill={skill} />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ skill }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--dark3)',
        border: `1px solid ${hovered ? 'var(--cr-dim)' : 'var(--dark4)'}`,
        padding: '1.5rem 1rem',
        borderRadius: '2px',
        textAlign: 'center',
        transition: 'all 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'default',
      }}
    >
      <span style={{
        fontSize: '2rem',
        display: 'block',
        marginBottom: '0.6rem',
      }}>
        {skill.icon}
      </span>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: hovered ? 'var(--cr-light)' : '#888',
        letterSpacing: '0.1em',
        transition: 'color 0.2s',
      }}>
        {skill.name}
      </div>
    </div>
  );
}

export default Skills;