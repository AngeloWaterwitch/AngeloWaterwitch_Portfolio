import React from 'react';
import { motion } from 'framer-motion';

function Timeline({ timeline }) {
  const education = timeline.filter(t => t.type === 'education');
  const work = timeline.filter(t => t.type === 'work');

  return (
    <section id="timeline" style={{
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
          My Journey
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
          Experience &{' '}
          <span style={{ color: 'var(--cr-light)' }}>Education</span>
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
            marginBottom: '4rem',
            transformOrigin: 'left',
          }}
        />

        {/* Two columns — Work + Education */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
        }}>

          {/* Work */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--cr-light)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
            }}>
              <span style={{
                display: 'inline-block',
                width: '1.5rem',
                height: '1px',
                background: 'var(--cr)',
              }} />
              Work Experience
            </div>
            <TimelineColumn items={work} />
          </div>

          {/* Education */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--cr-light)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
            }}>
              <span style={{
                display: 'inline-block',
                width: '1.5rem',
                height: '1px',
                background: 'var(--cr)',
              }} />
              Education
            </div>
            <TimelineColumn items={education} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineColumn({ items }) {
  return (
    <div style={{
      position: 'relative',
      paddingLeft: '2rem',
    }}>
      {/* Vertical line */}
      <div style={{
        position: 'absolute',
        left: '7px',
        top: 0,
        bottom: 0,
        width: '1px',
        background: 'var(--dark4)',
      }} />

      {items.map((item, i) => (
        <TimelineItem key={item.id || i} item={item} index={i} />
      ))}
    </div>
  );
}

function TimelineItem({ item, index }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        marginBottom: '2.5rem',
      }}
    >
      {/* Dot */}
      <div style={{
        position: 'absolute',
        left: '-2rem',
        top: '4px',
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        background: hovered ? 'var(--cr)' : 'var(--dark4)',
        border: '2px solid ' + (hovered ? 'var(--cr-light)' : 'var(--cr-dim)'),
        transition: 'all 0.2s',
        zIndex: 1,
      }} />

      {/* Card */}
      <div style={{
        background: hovered ? 'var(--dark3)' : 'var(--dark2)',
        border: '1px solid ' + (hovered ? 'var(--cr-dim)' : 'var(--dark4)'),
        borderRadius: '2px',
        padding: 'clamp(1rem, 3vw, 1.5rem)',
        transition: 'all 0.2s',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
      }}>

        {/* Period badge */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--cr-light)',
          letterSpacing: '0.1em',
          marginBottom: '0.6rem',
          display: 'inline-block',
          background: 'var(--cr-dim)',
          padding: '0.2rem 0.6rem',
          borderRadius: '1px',
        }}>
          {item.period}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
          fontWeight: 700,
          color: 'var(--light)',
          marginBottom: '0.3rem',
        }}>
          {item.title}
        </h3>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.65rem, 1.5vw, 0.72rem)',
          color: 'var(--cr-light)',
          letterSpacing: '0.08em',
          marginBottom: '0.8rem',
        }}>
          {item.organisation}
        </div>

        <p style={{
          fontSize: 'clamp(0.82rem, 2vw, 0.88rem)',
          color: '#777',
          lineHeight: 1.7,
        }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default Timeline;