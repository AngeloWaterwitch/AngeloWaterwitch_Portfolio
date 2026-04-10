import React from 'react';

function Projects({ projects }) {
  return (
    <section id="projects" style={{
      padding: '7rem 3rem',
      background: 'var(--dark2)',
    }}>

      {/* Section tag */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--cr-light)',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        marginBottom: '1rem',
      }}>
        My Work
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 800,
        lineHeight: 1.05,
        marginBottom: '1rem',
      }}>
        Featured <span style={{ color: 'var(--cr-light)' }}>Projects</span>
      </h2>

      {/* Divider */}
      <div style={{
        width: '3rem',
        height: '2px',
        background: 'var(--cr)',
        marginBottom: '3rem',
      }} />

      {/* Projects grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))',
        gap: '1.5rem',
      }}>
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = React.useState(false);

  const accentColors = [
    'hsl(348,60%,18%)',
    'hsl(220,60%,18%)',
    'hsl(160,60%,18%)',
    'hsl(280,60%,18%)',
  ];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--dark3)',
        border: `1px solid ${hovered ? 'var(--cr-dim)' : 'var(--dark4)'}`,
        borderRadius: '2px',
        overflow: 'hidden',
        transition: 'all 0.25s',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        height: '220px',
        background: accentColors[index % accentColors.length],
        position: 'relative',
        overflow: 'hidden',
      }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
            onError={e => {
              e.currentTarget.style.display = 'none';
            }}
          />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: '5rem',
                fontWeight: 800,
                color: 'rgba(255,255,255,0.06)',
                letterSpacing: '-0.05em',
              }}>
                {project.title?.charAt(0) ?? '•'}
              </div>
            )}
          </div>
        </div>
      );
    }
    
    export default Projects;
