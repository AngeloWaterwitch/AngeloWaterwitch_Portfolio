import { testimonialSchema, validate } from '../utils/validation';
import React, { useState } from 'react';
import { sanitise } from '../utils/sanitise';

function TestimonialSubmit({ onSubmit, onClose }) {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ author: '', role: '', quote: '' });
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = e => {
    e.preventDefault();

    const { valid, errors: validationErrors } = validate(testimonialSchema, {
      author: form.author,
      role: form.role,
      quote: form.quote,
    });

    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit({
      author: sanitise(form.author),
      role: sanitise(form.role),
      quote: sanitise(form.quote),
    });
    setStatus('success');
    setForm({ author: '', role: '', quote: '' });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '2rem',
    }}>
      <div style={{
        background: 'var(--dark2)',
        border: '1px solid var(--dark4)',
        borderRadius: '2px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '520px',
        position: 'relative',
      }}>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: '#666',
            fontSize: '1.2rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-display)',
          }}
        >
          ✕
        </button>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--cr-light)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '0.8rem',
        }}>
          Share Your Experience
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          fontWeight: 800,
          marginBottom: '0.5rem',
          color: 'var(--light)',
        }}>
          Leave a <span style={{ color: 'var(--cr-light)' }}>Testimonial</span>
        </h3>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: '#666',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}>
          Your testimonial will be reviewed before appearing on the site.
        </p>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎉</div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
              color: 'var(--light)',
            }}>
              Thank you!
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: '#666',
              marginBottom: '1.5rem',
            }}>
              Your testimonial has been submitted for review.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: '0.7rem 1.5rem',
                background: 'var(--cr)',
                color: '#fff',
                border: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.85rem',
                borderRadius: '1px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: '#666',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}>
                Your Name *
              </label>
              <input
                type="text"
                name="author"
                placeholder="Jane Smith"
                value={form.author}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  background: 'var(--dark)',
                  border: '1px solid var(--dark4)',
                  color: 'var(--light)',
                  padding: '0.8rem 1rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  borderRadius: '1px',
                  outline: 'none',
                }}
              />
            </div>

                {errors.author && (
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--cr-light)',
                  marginTop: '0.3rem',
                }}>
                  {errors.author}
                </div>
              )}

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: '#666',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}>
                Your Role / Company
              </label>
              <input
                type="text"
                name="role"
                placeholder="CEO, Acme Corp"
                value={form.role}
                onChange={handleChange}
                style={{
                  width: '100%',
                  background: 'var(--dark)',
                  border: '1px solid var(--dark4)',
                  color: 'var(--light)',
                  padding: '0.8rem 1rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  borderRadius: '1px',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: '#666',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}>
                Your Testimonial *
              </label>
              <textarea
                name="quote"
                placeholder="Tell others about your experience working with Angelo..."
                value={form.quote}
                onChange={handleChange}
                required
                rows={4}
                style={{
                  width: '100%',
                  background: 'var(--dark)',
                  border: '1px solid var(--dark4)',
                  color: 'var(--light)',
                  padding: '0.8rem 1rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  borderRadius: '1px',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '100px',
                }}
              />
            </div>

              {errors.quote && (
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--cr-light)',
                  marginTop: '0.3rem',
                }}>
                  {errors.quote}
                </div>
              )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                background: 'var(--cr)',
                color: '#fff',
                border: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                borderRadius: '1px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              Submit Testimonial
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default TestimonialSubmit;