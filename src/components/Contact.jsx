import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { sanitise } from '../utils/sanitise';
import { validate } from '../utils/validation';

function Contact({ contact, onMessage }) {
  const [form, setForm] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    if (form.honeypot) return;

    const result = validate('contact', {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setStatus('sending');

    const clean = {
      name: sanitise(form.name),
      email: sanitise(form.email),
      message: sanitise(form.message),
    };

    onMessage(clean);

    emailjs.send(
      'service_4ygvl7n',
      'template_14pi014',
      clean,
      '66bbAvGf6kl0cQLvw'
    )
      .then(() => {
        setStatus('success');
        setForm({ name: '', email: '', message: '', honeypot: '' });
      })
      .catch(() => {
        setStatus('error');
      });
  };

  const contactItems = [
    { label: 'Email',    value: contact.email,    href: 'mailto:' + contact.email },
    { label: 'Phone',    value: contact.phone,    href: 'tel:' + contact.phone },
    { label: 'Location', value: contact.location, href: null },
  ];

  const socials = [
    { label: 'Facebook',  url: contact.facebook },
    { label: 'LinkedIn',  url: contact.linkedin },
    { label: 'Instagram', url: contact.instagram },
    { label: 'GitHub',    url: contact.github },
  ];

  return (
    <section id="contact" style={{
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
      background: 'var(--dark)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
        gap: 'clamp(2rem, 5vw, 5rem)',
        alignItems: 'start',
      }}>

        {/* Left — Info */}
        <div>
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
            Say Hello
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
            Get In{' '}
            <span style={{ color: 'var(--cr-light)' }}>Touch</span>
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
              marginBottom: '2.5rem',
              transformOrigin: 'left',
            }}
          />

          {contactItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              style={{ marginBottom: '1.5rem' }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: '#555',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.3rem',
              }}>
                {item.label}
              </div>
              {item.href ? (
                <a href={item.href} style={{
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  color: 'var(--cr-light)',
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--cr-dim)',
                  wordBreak: 'break-all',
                }}>
                  {item.value}
                </a>
              ) : (
                <p style={{
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  color: 'var(--light)',
                }}>
                  {item.value}
                </p>
              )}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.8rem',
              marginTop: '2rem',
            }}
          >
            {socials.map((s, i) => (
              <SocialChip key={i} label={s.label} url={s.url} />
            ))}
          </motion.div>
        </div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            background: 'var(--dark3)',
            border: '1px solid var(--dark4)',
            borderRadius: '2px',
            padding: 'clamp(1.2rem, 4vw, 2rem)',
          }}
        >
          <form onSubmit={handleSubmit} noValidate>

            {/* Honeypot */}
            <div style={{ display: 'none' }}>
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <ContactField
              label="Name"
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />

            <ContactField
              label="Email"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: errors.message ? 'var(--cr-light)' : '#666',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}>
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                rows={5}
                style={{
                  width: '100%',
                  background: 'var(--dark)',
                  border: '1px solid ' + (errors.message ? 'var(--cr-dim)' : 'var(--dark4)'),
                  color: 'var(--light)',
                  padding: '0.8rem 1rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
                  borderRadius: '1px',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '120px',
                }}
              />
              {errors.message && (
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--cr-light)',
                  marginTop: '0.3rem',
                  letterSpacing: '0.05em',
                }}>
                  {errors.message}
                </div>
              )}
            </div>

            <SubmitButton status={status} />

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: '#4caf50',
                  marginTop: '1rem',
                  textAlign: 'center',
                  letterSpacing: '0.08em',
                }}
              >
                ✓ Message sent! I'll be in touch soon.
              </motion.p>
            )}

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--cr-light)',
                  marginTop: '1rem',
                  textAlign: 'center',
                  letterSpacing: '0.08em',
                }}
              >
                ✕ Something went wrong. Please try again.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function ContactField({ label, type, name, placeholder, value, onChange, error }) {
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <label style={{
        display: 'block',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: error ? 'var(--cr-light)' : '#666',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '0.4rem',
        transition: 'color 0.2s',
      }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          background: 'var(--dark)',
          border: '1px solid ' + (error ? 'var(--cr-dim)' : 'var(--dark4)'),
          color: 'var(--light)',
          padding: '0.8rem 1rem',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
          borderRadius: '1px',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
      />
      {error && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: 'var(--cr-light)',
          marginTop: '0.3rem',
          letterSpacing: '0.05em',
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

function SubmitButton({ status }) {
  const [hovered, setHovered] = useState(false);
  const sending = status === 'sending';

  const getBg = () => {
    if (sending) return 'var(--dark4)';
    if (hovered) return 'var(--cr-light)';
    return 'var(--cr)';
  };

  return (
    <button
      type="submit"
      disabled={sending}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        padding: '1rem',
        background: getBg(),
        color: '#fff',
        border: 'none',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(0.8rem, 2vw, 0.85rem)',
        fontWeight: 700,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        borderRadius: '1px',
        cursor: sending ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s',
      }}
    >
      {sending ? 'Sending...' : 'Send Message'}
    </button>
  );
}

function SocialChip({ label, url }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.65rem, 1.5vw, 0.72rem)',
        border: '1px solid ' + (hovered ? 'var(--cr-light)' : '#333'),
        padding: '0.4rem 0.8rem',
        borderRadius: '1px',
        color: hovered ? 'var(--cr-light)' : '#888',
        transition: 'all 0.2s',
        letterSpacing: '0.08em',
      }}
    >
      {label}
    </a>
  );
}

export default Contact;