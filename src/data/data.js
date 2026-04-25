export const defaultData = {
branding: {
    displayFont: 'Syne',
    monoFont: 'Space Mono',
    logoText: 'AW.',
    logoUrl: '',
  },

resume: {
    enabled: true,
    url: '/resume/AngeloWaterwitch_CV (4).pdf',
    label: 'Download CV',
  },

seo: {
    title: 'Angelo Waterwitch — Software & Design Engineer',
    description: 'Portfolio of Angelo Waterwitch, a software and design engineer based in the NorthernCape, Springhbok, South Africa. Specialising in React, UI/UX, and creative digital experiences.',
    keywords: 'Angelo Waterwitch, web developer, software engineer, design engineer, React, NorthernCape, portfolio',
    ogImage: '',
    twitterHandle: '@yeah_itsangelo',
  },

  hero: {
    name: "Angelo Waterwitch",
    role: "Software & Design Engineer",
    sub: "I turn complex problems into elegant, functional solutions — blending creativity with technical precision.",
    resumeEnabled: true,
    resumeUrl: '/resume/AngeloWaterwitch_CV (4).pdf',
    resumeLabel: 'Download CV',
  },

  about: {
    bio1: "My name is Angelo Waterwitch, I am a software and design engineering student deeply committed to mastering the blend of creativity and technical precision.",
    bio2: "I thrive on turning complex problems into elegant, functional solutions, with a focus on creating impactful digital experiences. Whether working on code, user interfaces, or multimedia elements, my goal is to merge form and function seamlessly.",
    years: "3+",
    projects: "3+",
    clients: "2",
    standing: "Fully Qualified",
  },

skills: [
    { id: 's1',  icon: '⚛️', name: 'React' },
    { id: 's2',  icon: '🎨', name: 'CSS / Sass' },
    { id: 's3',  icon: '⚡', name: 'JavaScript' },
    { id: 's4',  icon: '📐', name: 'Figma' },
    { id: 's5',  icon: '🌐', name: 'HTML5' },
    { id: 's6',  icon: '🗄️', name: 'MySQL' },
    { id: 's8',  icon: '🟩', name: 'Node.js' },
    { id: 's10', icon: '🔧', name: 'TypeScript' },
  ],

  projects: [
    {
      title: "Home Connect",
      desc: "A .",
      tags: ["React", "Node.js", "MySQL"],
      link: "#",
      image: "/images/home-connect.png",
    },
    {
      title: "Mammoth Studio",
      desc: "Brand identity and web presence for a creative production studio.",
      tags: ["Figma", "WordPress", "CSS"],
      link: "#",
      image: "/images/mammoth.png",
    },
    {
      title: "Portfolio v1",
      desc: "First iteration of personal portfolio — dark theme, animated sections.",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "#",
      image: "",
    },
    {
      title: "NamaquaChic",
      desc: "Full-featured product catalogue with cart, filters, and checkout flow.",
      tags: ["React", "PHP", "CSS"],
      link: "#",
      image: "",
    },
  ],

  services: [
    {
      num: "01",
      title: "Logo Design",
      desc: "Logos that represent a brand's identity and leave a lasting impression — minimal, versatile, and unique.",
    },
    {
      num: "02",
      title: "Web Design",
      desc: "Visually engaging and easy-to-navigate websites that deliver an intuitive user experience across all platforms.",
    },
    {
      num: "03",
      title: "Product Design",
      desc: "From concept to final design — solving real-world problems through innovative, practical design solutions.",
    },
  ],

  timeline: [
    {
      id: 't1',
      type: 'education',
      title: 'ICT: MULTIMEDIA APPLICATIONS (NQF LEVEL 7)  ',
      organisation: 'CPUT — Cape Peninsula University of Technology',
      period: '2022 — 2026',
      desc: 'Studying software and design engineering with a focus on full-stack development, UI/UX design, and creative digital solutions.',
    },
    {
      id: 't2',
      type: 'education',
      title: 'National Senior Certificate',
      organisation: 'High School',
      period: '2017 — 2021',
      desc: 'Completed matric with a focus on IT and design subjects.',
    },
    {
      id: 't3',
      type: 'work',
      title: 'Freelance Web Developer & Designer',
      organisation: 'Self Employed',
      period: '2022 — Present',
      desc: 'Building websites and brand identities for local businesses and individuals across the country.',
    },
  ],

  testimonials: [
    {
      quote: "",
      author: "",
      role: "",
    },
    {
      quote: "",
      author: "",
      role: "",
    },
    {
      quote: "",
      author: "",
      role: "",
    },
    {
      quote: "",
      author: "",
      role: "",
    },
  ],

  contact: {
    email: "angelo@waterwitch.dev",
    phone: "+27 XX XXX XXXX",
    location: "Springbok, South Africa",
    facebook: "https://web.facebook.com/Angelo.waterwitch.26",
    linkedin: "https://www.linkedin.com/in/angelo-waterwitch-514248233/",
    instagram: "https://www.instagram.com/yeah_itsangelo/",
    github: "https://github.com/AngeloWaterwitch",
  },

  sections: [
    { id: "home",         label: "Home",         visible: true },
    { id: "about",        label: "About",         visible: true },
    { id: "skills",       label: "Skills",        visible: true },
    { id: "projects",     label: "Projects",      visible: true },
    { id: "services",     label: "Services",      visible: true },
    { id: 'timeline',     label: 'Timeline',      visible: true },
    { id: "testimonials", label: "Testimonials",  visible: true },
    { id: "contact",      label: "Contact",       visible: true },
  ],
};