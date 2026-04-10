import React, { useState, useEffect } from 'react';
import { useSiteData } from './data/useSiteData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { data, updateData } = useSiteData();
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>
      <Navbar
        sections={data.sections}
        onAdminClick={() => setAdminOpen(true)}
      />
      <Hero hero={data.hero} />
      <About about={data.about} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Services services={data.services} />
      <Testimonials testimonials={data.testimonials} />
      <Contact contact={data.contact} />
      <Footer sections={data.sections} contact={data.contact} />
    </div>
  );
}

export default App;