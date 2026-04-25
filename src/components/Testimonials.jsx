import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TestimonialSubmit from './TestimonialSubmit';

function Testimonials({ testimonials = [], onSubmit }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="testimonials" style={{
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
      background: 'var(--dark2)',
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
          Social Proof
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
          }}>
            What Clients{' '}
            <span style={{ color: 'var(--cr-light)' }}>Say</span>
          </h2>

          <LeaveButton onClick={() => setShowForm(true)} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            width: '3rem',
            height: '2px',
            background: 'var(--cr)',
            marginBottom: '3rem',
            transformOrigin: 'left',
          }}
        />

        {testimonials.length === 0 && (
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#555',
            marginBottom: '2rem',
          }}>
            No testimonials yet — be the first!
          </p>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(1rem, 3vw, 1.5rem)',
        }}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>

      {showForm && (
        <TestimonialSubmit
          onSubmit={(data) => {
            onSubmit(data);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </section>
  );
}

function LeaveButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.65rem, 2vw, 0.75rem)',
        padding: 'clamp(0.4rem, 1.5vw, 0.6rem) clamp(0.8rem, 2vw, 1.2rem)',
        background: 'transparent',
        border: '1px solid ' + (hovered ? 'var(--cr-light)' : 'var(--dark4)'),
        color: hovered ? 'var(--cr-light)' : '#666',
        borderRadius: '1px',
        cursor: 'pointer',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      + Leave a Testimonial
    </button>
  );
}

function TestimonialCard({ testimonial, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--dark3)',
        border: '1px solid ' + (hovered ? 'var(--cr-dim)' : 'var(--dark4)'),
        borderRadius: '2px',
        padding: 'clamp(1.2rem, 3vw, 2rem)',
        position: 'relative',
        transition: 'all 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '0.5rem',
        right: '1.5rem',
        fontFamily: 'Georgia, serif',
        fontSize: 'clamp(3rem, 8vw, 5rem)',
        lineHeight: 1,
        color: hovered ? 'var(--cr-dim)' : 'rgba(255,255,255,0.04)',
        transition: 'color 0.3s',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        "
      </div>

      <p style={{
        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
        color: '#aaa',
        lineHeight: 1.7,
        fontStyle: 'italic',
        marginBottom: '1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {testimonial.quote}
      </p>

      <div style={{
        width: '2rem',
        height: '1px',
        background: 'var(--cr-dim)',
        marginBottom: '1rem',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
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
            fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
            color: 'var(--light)',
          }}>
            {testimonial.author}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.62rem, 1.5vw, 0.7rem)',
            color: '#666',
            marginTop: '0.2rem',
            letterSpacing: '0.05em',
          }}>
            {testimonial.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Testimonials;