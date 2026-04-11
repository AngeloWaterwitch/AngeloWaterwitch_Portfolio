export const defaultData = {
  hero: {
    name: "Angelo Waterwitch",
    role: "Software & Design Engineer",
    sub: "I turn complex problems into elegant, functional solutions — blending creativity with technical precision.",
    resumeUrl: "/resume/AngeloWaterwitch_CV (4).pdf",
  },

  about: {
    bio1: "My name is Angelo Waterwitch, I am a software and design engineering student deeply committed to mastering the blend of creativity and technical precision.",
    bio2: "I thrive on turning complex problems into elegant, functional solutions, with a focus on creating impactful digital experiences. Whether working on code, user interfaces, or multimedia elements, my goal is to merge form and function seamlessly.",
    years: "3+",
    projects: "15+",
    clients: "10+",
    standing: "Distinction",
  },

skills: [
    { id: 's1',  icon: '⚛️', name: 'React' },
    { id: 's2',  icon: '🎨', name: 'CSS / Sass' },
    { id: 's3',  icon: '⚡', name: 'JavaScript' },
    { id: 's4',  icon: '📐', name: 'Figma' },
    { id: 's5',  icon: '🌐', name: 'HTML5' },
    { id: 's6',  icon: '🗄️', name: 'MySQL' },
    { id: 's7',  icon: '🐘', name: 'PHP' },
    { id: 's8',  icon: '🟩', name: 'Node.js' },
    { id: 's9',  icon: '🔷', name: 'WordPress' },
    { id: 's10', icon: '🔧', name: 'TypeScript' },
  ],
  
  projects: [
    {
      title: "Home Connect",
      desc: "A real estate web platform connecting buyers and sellers with intuitive UI and smart search.",
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
      title: "E-commerce UI",
      desc: "Full-featured product catalogue with cart, filters, and checkout flow.",
      tags: ["React", "PHP", "MySQL"],
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

  testimonials: [
    {
      quote: "Angelo delivered beyond our expectations. His attention to detail and design sensibility is remarkable.",
      author: "Sarah Hendricks",
      role: "Founder, Bloom Studio",
    },
    {
      quote: "The website he built for us doubled our engagement rate. Truly understands both design and development.",
      author: "James Mokoena",
      role: "CEO, Apex Digital",
    },
    {
      quote: "Professional, fast, and creative. Angelo's work speaks for itself.",
      author: "Layla Peterson",
      role: "Marketing Director, NexaCo",
    },
    {
      quote: "He redesigned our brand from scratch — the results were stunning. Highly recommend.",
      author: "Thabo Dlamini",
      role: "Product Manager, Solara",
    },
  ],

  contact: {
    email: "angelo@waterwitch.dev",
    phone: "+27 XX XXX XXXX",
    location: "Cape Town, South Africa",
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
    { id: "testimonials", label: "Testimonials",  visible: true },
    { id: "contact",      label: "Contact",       visible: true },
  ],
};