import React from 'react';
import { motion } from 'framer-motion';

function Skills({ skills }) {
  return (
    <section id="skills" style={{
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
      background: 'var(--dark)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--cr-light)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          What I Use
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: '1rem',
          }}
        >
          My <span style={{ color: 'var(--cr-light)' }}>Skills</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            width: '3rem',
            height: '2px',
            background: 'var(--cr)',
            marginBottom: '1.5rem',
            transformOrigin: 'left',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            color: '#888',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            lineHeight: 1.7,
            maxWidth: '550px',
            marginBottom: '3rem',
          }}
        >
          I diversify my skillset through various coding languages and design
          tools to produce the best products for my clients.
        </motion.p>

        {skills.length === 0 && (
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#555',
          }}>
            No skills added yet — add some from the admin dashboard.
          </p>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(80px, 15vw, 120px), 1fr))',
          gap: 'clamp(0.6rem, 2vw, 1rem)',
        }}>
          {skills.map((skill, i) => (
            <SkillCard key={skill.id || i} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--dark3)',
        border: '1px solid ' + (hovered ? 'var(--cr-dim)' : 'var(--dark4)'),
        padding: 'clamp(1rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem)',
        borderRadius: '2px',
        textAlign: 'center',
        transition: 'all 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'default',
      }}
    >
      {skill.icon && skill.icon.startsWith('http') ? (
        <img
          src={skill.icon}
          alt={skill.name}
          style={{
            width: 'clamp(1.5rem, 4vw, 2rem)',
            height: 'clamp(1.5rem, 4vw, 2rem)',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto 0.6rem',
          }}
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
      ) : (
        <span style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          display: 'block',
          marginBottom: '0.6rem',
        }}>
          {skill.icon}
        </span>
      )}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
        color: hovered ? 'var(--cr-light)' : '#888',
        letterSpacing: '0.1em',
        transition: 'color 0.2s',
      }}>
        {skill.name}
      </div>
    </motion.div>
  );
}

export default Skills;