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
import Admin from './admin/Admin';

function App() {
  const {
    data,
    updateData,
    pending,
    submitTestimonial,
    approvePending,
    removePending,
  } = useSiteData();

  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  if (adminOpen) {
    return (
      <Admin
        data={data}
        onSave={updateData}
        onClose={() => setAdminOpen(false)}
        pending={pending}
        onApprove={approvePending}
        onRemovePending={removePending}
      />
    );
  }

  const sectionOrder = data.sections.map(s => s.id);

  const renderSection = (id) => {
    const visible = data.sections.find(s => s.id === id)?.visible;
    if (!visible) return null;

    switch (id) {
      case 'home':         return <Hero         key={id} hero={data.hero} />;
      case 'about':        return <About        key={id} about={data.about} />;
      case 'skills':       return <Skills       key={id} skills={data.skills} />;
      case 'projects':     return <Projects     key={id} projects={data.projects} />;
      case 'services':     return <Services     key={id} services={data.services} />;
    case 'testimonials': return <Testimonials key={id} testimonials={data.testimonials || []} onSubmit={submitTestimonial} />;
      case 'contact':      return <Contact      key={id} contact={data.contact} />;
      default:             return null;
    }
  };

  return (
    <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>
      <Navbar
        sections={data.sections}
        onAdminClick={() => setAdminOpen(true)}
      />
      {sectionOrder.map(id => renderSection(id))}
      <Footer sections={data.sections} contact={data.contact} />
    </div>
  );
}

export default App;