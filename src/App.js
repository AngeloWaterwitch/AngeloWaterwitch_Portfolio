import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [navActive, setNavActive] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setErrorMsg('Please fill in all fields');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setIsSending(true);

    emailjs.send(
      'service_4ygvl7n',  // Your EmailJS service ID
      'template_14pi014',  // Your EmailJS template ID
      formData,
      '66bbAvGf6kl0cQLvw'  // Your EmailJS public key
    )
      .then(() => {
        setSuccessMsg('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        setErrorMsg('Failed to send message. Please try again later.');
        console.error('EmailJS error:', error);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const toggleBurger = () => {
    setNavActive(!navActive);
  };

  return (
    <div className="App">

      {/* Navbar */}
      <nav className="navbar-container">
        <div className="nav-logo">
          <img src="images/Waterwitch..png" alt="Logo" className="logo" />
        </div>

        <div
          className={`menu-toggle ${navActive ? 'active' : ''}`}
          onClick={toggleBurger}
          aria-expanded={navActive}
          aria-label="Toggle navigation menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') toggleBurger(); }}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`nav-list ${navActive ? 'active' : ''}`}>
          <li><a href="#home" onClick={() => setNavActive(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setNavActive(false)}>About</a></li>
          <li><a href="#skills" onClick={() => setNavActive(false)}>Skills</a></li>
          <li><a href="#services" onClick={() => setNavActive(false)}>Services</a></li>
          <li><a href="#contact" onClick={() => setNavActive(false)}>Contact</a></li>
        </ul>
      </nav>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        {successMsg && <p className="success-message">{successMsg}</p>}
        {errorMsg && <p className="error-message">{errorMsg}</p>}
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-navbar">
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-social-icons">
            <a href="https://web.facebook.com/Angelo.waterwitch.26" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.linkedin.com/in/angelo-waterwitch-514248233/" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/yeah_itsangelo/" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://github.com/AngeloWaterwitch" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-github"></i>
            </a>
          </div>

          <div className="footer-logo">
            <img src="images/Waterwitch..png" alt="Logo" className="footer-logo-img" />
          </div>
        </div>

        <p className="footer-text">© 2024 Angelo Waterwitch. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;


