import React, { useState, useEffect } from 'react';
import SEO from './components/SEO';
import { useSiteData } from './data/useSiteData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Timeline from './components/Timeline';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './admin/Admin';
import { HeroSkeleton, SectionSkeleton, CardsSkeleton, SkillsSkeleton } from './components/Skeleton';

const FONT_LINKS = {
  'Syne':             'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap',
  'Inter':            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  'Playfair Display': 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&display=swap',
  'Raleway':          'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800&display=swap',
  'Oswald':           'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap',
  'Space Mono':       'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap',
  'Fira Code':        'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap',
  'JetBrains Mono':   'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap',
};

function loadFonts(display, mono) {
  [display, mono].forEach(font => {
    if (!font || !FONT_LINKS[font]) return;
    const id = 'font-' + font.replace(/\s/g, '-');
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = FONT_LINKS[font];
    document.head.appendChild(link);
  });
}

function applyBranding(branding) {
  const root = document.documentElement;
  if (branding.displayFont) {
    root.style.setProperty('--font-display', "'" + branding.displayFont + "', sans-serif");
    loadFonts(branding.displayFont, branding.monoFont);
  }
  if (branding.monoFont) {
    root.style.setProperty('--font-mono', "'" + branding.monoFont + "', monospace");
  }
}

function App() {
  const {
    data,
    updateData,
    resetData,
    pending,
    submitTestimonial,
    approvePending,
    removePending,
    messages,
    saveMessage,
    markMessageRead,
    deleteMessage,
  } = useSiteData();

  const [adminOpen, setAdminOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applyBranding(data.branding || {});
  }, [data.branding]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (adminOpen) {
    return (
      <Admin
        data={data}
        onSave={updateData}
        onClose={() => setAdminOpen(false)}
        onReset={resetData}
        pending={pending}
        onApprove={approvePending}
        onRemovePending={removePending}
        messages={messages}
        onMarkRead={markMessageRead}
        onDeleteMessage={deleteMessage}
      />
    );
  }

  const sectionOrder = data.sections.map(s => s.id);

  const renderSection = (id) => {
    const visible = data.sections.find(s => s.id === id)?.visible;
    if (!visible) return null;

    if (loading) {
      switch (id) {
        case 'home':         return <HeroSkeleton key={id + '-sk'} />;
        case 'skills':       return <SkillsSkeleton key={id + '-sk'} />;
        case 'projects':     return <CardsSkeleton key={id + '-sk'} count={4} />;
        case 'testimonials': return <CardsSkeleton key={id + '-sk'} count={4} />;
        default:             return <SectionSkeleton key={id + '-sk'} />;
      }
    }

    switch (id) {
      case 'home':         return <Hero         key={id} hero={data.hero} />;
      case 'about':        return <About        key={id} about={data.about} />;
      case 'skills':       return <Skills       key={id} skills={data.skills} />;
      case 'projects':     return <Projects     key={id} projects={data.projects} />;
      case 'services':     return <Services     key={id} services={data.services} />;
      case 'timeline':     return <Timeline     key={id} timeline={data.timeline || []} />;
      case 'testimonials': return <Testimonials key={id} testimonials={data.testimonials || []} onSubmit={submitTestimonial} />;
      case 'contact':      return <Contact      key={id} contact={data.contact} onMessage={saveMessage} />;
      default:             return null;
    }
  };

  return (
    <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>
      <SEO seo={data.seo} branding={data.branding} />
      <Navbar
        sections={data.sections}
        branding={data.branding}
        onAdminClick={() => setAdminOpen(true)}
      />
      {sectionOrder.map(id => renderSection(id))}
      <Footer sections={data.sections} contact={data.contact} branding={data.branding} />
    </div>
  );
}

export default App;