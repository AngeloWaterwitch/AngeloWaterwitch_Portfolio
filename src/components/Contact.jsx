import React, { useState } from 'react';
import emailjs from 'emailjs-com';

function Contact({ contact }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStatus('sending');

    emailjs.send(
      'service_4ygvl7n',
      'template_14pi014',
      form,
      '66bbAvGf6kl0cQLvw'
    )
      .then(() => {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setStatus('error');
      });
  };

  const socials = [
    { label: 'Facebook',  url: contact.facebook },
    { label: 'LinkedIn',  url: contact.linkedin },
    { label: 'Instagram', url: contact.instagram },
    { label: 'GitHub',    url: contact.github },
  ];

  const contactItems = [
    { label: 'Email',    value: contact.email,    href: 'mailto:' + contact.email },
    { label: 'Phone',    value: contact.phone,    href: 'tel:' + contact.phone },
    { label: 'Location', value: contact.location, href: null },
  ];

  return (
    <section id="contact" style={{
      padding: '7rem 3rem',
      background: 'var(--dark)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '5rem',
      alignItems: 'start',
    }}>

      {/* Left — contact info */}
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--cr-light)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Say Hello
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          marginBottom: '1rem',
        }}>
          Get In <span style={{ color: 'var(--cr-light)' }}>Touch</span>
        </h2>

        <div style={{
          width: '3rem',
          height: '2px',
          background: 'var(--cr)',
          marginBottom: '2.5rem',
        }} />

        {contactItems.map((item, i) => (
          <div key={i} style={{ marginBottom: '1.5rem' }}>
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
                fontSize: '1rem',
                color: 'var(--cr-light)',
                textDecoration: 'underline',
                textDecorationColor: 'var(--cr-dim)',
              }}>
                {item.value}
              </a>
            ) : (
              <p style={{ fontSize: '1rem', color: 'var(--light)' }}>
                {item.value}
              </p>
            )}
          </div>
        ))}

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.8rem',
          marginTop: '2rem',
        }}>
          {socials.map((s, i) => (
            <SocialChip key={i} label={s.label} url={s.url} />
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div style={{
        background: 'var(--dark3)',
        border: '1px solid var(--dark4)',
        borderRadius: '2px',
        padding: '2rem',
      }}>
        <form onSubmit={handleSubmit}>

          <FormField
            label="Name"
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />

          <FormField
            label="Email"
            type="email"
            name="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
          />

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
              Message
            </label>
            <textarea
              name="message"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
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
                minHeight: '120px',
              }}
            />
          </div>

          <SubmitButton status={status} />

          {status === 'success' && (
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#4caf50',
              marginTop: '1rem',
              textAlign: 'center',
              letterSpacing: '0.08em',
            }}>
              ✓ Message sent! I'll be in touch soon.
            </p>
          )}

          {status === 'error' && (
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--cr-light)',
              marginTop: '1rem',
              textAlign: 'center',
              letterSpacing: '0.08em',
            }}>
              ✕ Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function FormField({ label, type, name, placeholder, value, onChange }) {
  return (
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
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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
        fontSize: '0.85rem',
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
        fontSize: '0.72rem',
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