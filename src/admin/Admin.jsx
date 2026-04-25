import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import DragList from './DragList';

function Admin({ onClose, data, onSave, pending, onApprove, onRemovePending }) {
  const [authed, setAuthed] = useState(false);
  const [local, setLocal] = useState(() => JSON.parse(JSON.stringify(data)));
  const [saved, setSaved] = useState(false);

  const set = (path, value) => {
    setLocal(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = next;
      for (let k of keys.slice(0, -1)) obj = obj[k];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleSave = () => {
    onSave(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--dark)',
      color: 'var(--light)',
      fontFamily: 'var(--font-display)',
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid var(--dark4)',
        background: 'var(--dark2)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>
          ⚙ Admin <span style={{ color: 'var(--cr-light)' }}>Dashboard</span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: '1px solid #444',
            color: '#aaa',
            padding: '0.5rem 1.2rem',
            fontFamily: 'var(--font-display)',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: '1px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          ← Back to Site
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>

        {/* SEO */}
        <AdminLabel>SEO & Meta Tags</AdminLabel>
        <AdminGrid>
          <AdminField
            label="Page Title"
            value={local.seo?.title || ''}
            onChange={v => set('seo.title', v)}
            fullWidth
          />
          <AdminField
            label="Meta Description"
            value={local.seo?.description || ''}
            onChange={v => set('seo.description', v)}
            textarea
            fullWidth
          />
          <AdminField
            label="Keywords (comma separated)"
            value={local.seo?.keywords || ''}
            onChange={v => set('seo.keywords', v)}
            fullWidth
          />
          <AdminField
            label="OG Image URL (for link previews)"
            value={local.seo?.ogImage || ''}
            onChange={v => set('seo.ogImage', v)}
          />
          <AdminField
            label="Twitter Handle"
            value={local.seo?.twitterHandle || ''}
            onChange={v => set('seo.twitterHandle', v)}
          />
        </AdminGrid>
        <div style={{
          background: 'var(--dark3)',
          border: '1px solid var(--dark4)',
          borderRadius: '2px',
          padding: '1rem 1.2rem',
          marginBottom: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: '#555',
          lineHeight: 1.7,
        }}>
          💡 After deploying to Vercel, submit your URL to{' '}
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--cr-light)' }}
          >
            Google Search Console
          </a>
          {' '}for better search visibility.
        </div>

        {/* Branding */}
        <AdminLabel>Branding</AdminLabel>
        <AdminGrid>
          <AdminField
            label="Logo Text (shown if no image)"
            value={local.branding?.logoText || ''}
            onChange={v => set('branding.logoText', v)}
          />
          <AdminField
            label="Logo Image URL (optional)"
            value={local.branding?.logoUrl || ''}
            onChange={v => set('branding.logoUrl', v)}
          />
        </AdminGrid>

        <AdminLabel>Display Font</AdminLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '0.8rem',
          marginBottom: '1.5rem',
        }}>
          {['Syne', 'Inter', 'Playfair Display', 'Raleway', 'Oswald'].map(font => (
            <FontOption
              key={font}
              font={font}
              selected={local.branding?.displayFont === font}
              onClick={() => set('branding.displayFont', font)}
              type="display"
            />
          ))}
        </div>

        <AdminLabel>Mono Font</AdminLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '0.8rem',
          marginBottom: '1.5rem',
        }}>
          {['Space Mono', 'Fira Code', 'JetBrains Mono'].map(font => (
            <FontOption
              key={font}
              font={font}
              selected={local.branding?.monoFont === font}
              onClick={() => set('branding.monoFont', font)}
              type="mono"
            />
          ))}
        </div>

        {/* Section order */}
        <AdminLabel>Section Order and Visibility</AdminLabel>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: '#555',
          marginBottom: '1rem',
        }}>
          Drag to reorder • Toggle to show/hide
        </p>

        <DragList
          items={local.sections}
          onReorder={arr => set('sections', arr)}
          renderItem={(item, i) => (
            <React.Fragment>
              <span style={{ flex: 1, fontWeight: 600 }}>{item.label}</span>
              <Toggle
                checked={item.visible}
                onChange={val => {
                  const arr = [...local.sections];
                  arr[i] = { ...arr[i], visible: val };
                  set('sections', arr);
                }}
              />
            </React.Fragment>
          )}
        />

        {/* Hero */}
        <AdminLabel>Hero Content</AdminLabel>
        <AdminGrid>
          {['name', 'role', 'resumeUrl'].map(k => (
            <AdminField
              key={k}
              label={k}
              value={local.hero[k]}
              onChange={v => set('hero.' + k, v)}
            />
          ))}
          <AdminField
            label="sub (tagline)"
            value={local.hero.sub}
            onChange={v => set('hero.sub', v)}
            textarea
            fullWidth
          />
        </AdminGrid>

        {/* About */}
        <AdminLabel>About Me</AdminLabel>
        <AdminGrid>
          <AdminField label="bio1" value={local.about.bio1} onChange={v => set('about.bio1', v)} textarea fullWidth />
          <AdminField label="bio2" value={local.about.bio2} onChange={v => set('about.bio2', v)} textarea fullWidth />
          {['years', 'projects', 'clients', 'standing'].map(k => (
            <AdminField key={k} label={k} value={local.about[k]} onChange={v => set('about.' + k, v)} />
          ))}
        </AdminGrid>

        {/* Projects */}
        <AdminLabel>Projects</AdminLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {local.projects.map((p, i) => (
            <div key={i} style={{
              background: 'var(--dark3)',
              border: '1px solid var(--dark4)',
              borderRadius: '2px',
              padding: '1.2rem',
            }}>
              <AdminGrid>
                <AdminField label="title" value={p.title} onChange={v => {
                  const arr = [...local.projects];
                  arr[i] = { ...arr[i], title: v };
                  set('projects', arr);
                }} />
                <AdminField label="link" value={p.link} onChange={v => {
                  const arr = [...local.projects];
                  arr[i] = { ...arr[i], link: v };
                  set('projects', arr);
                }} />
                <AdminField label="tags (comma separated)" value={p.tags.join(', ')} onChange={v => {
                  const arr = [...local.projects];
                  arr[i] = { ...arr[i], tags: v.split(',').map(t => t.trim()) };
                  set('projects', arr);
                }} fullWidth />
                <AdminField label="description" value={p.desc} onChange={v => {
                  const arr = [...local.projects];
                  arr[i] = { ...arr[i], desc: v };
                  set('projects', arr);
                }} textarea fullWidth />
              </AdminGrid>
              <button
                onClick={() => {
                  const arr = local.projects.filter((_, j) => j !== i);
                  set('projects', arr);
                }}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.4rem 0.8rem',
                  background: 'transparent',
                  border: '1px solid #333',
                  color: '#666',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  borderRadius: '1px',
                  cursor: 'pointer',
                }}
              >
                Remove Project
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const arr = [...local.projects, {
                title: 'New Project',
                desc: 'Description here',
                tags: ['React'],
                link: '#',
                image: '',
              }];
              set('projects', arr);
            }}
            style={{
              padding: '0.8rem',
              background: 'transparent',
              border: '1px dashed var(--dark4)',
              color: '#666',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              borderRadius: '1px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            + Add Project
          </button>
        </div>

        {/* Testimonials */}
        {/* Pending Testimonials */}
        <AdminLabel>Pending Testimonials</AdminLabel>
        {pending.length === 0 ? (
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#555',
            marginBottom: '1rem',
          }}>
            No pending submissions right now.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
            {pending.map(p => (
              <div key={p.id} style={{
                background: 'var(--dark3)',
                border: '1px solid hsl(348,40%,25%)',
                borderRadius: '2px',
                padding: '1.2rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--cr-light)',
                  letterSpacing: '0.1em',
                  marginBottom: '0.8rem',
                }}>
                  NEW SUBMISSION — {new Date(p.submittedAt).toLocaleDateString()}
                </div>
                <p style={{
                  fontStyle: 'italic',
                  color: '#aaa',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  marginBottom: '0.8rem',
                }}>
                  "{p.quote}"
                </p>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#888',
                  marginBottom: '1rem',
                }}>
                  — {p.author}{p.role ? ', ' + p.role : ''}
                </div>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button
                    onClick={() => onApprove(p.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'var(--cr)',
                      color: '#fff',
                      border: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      borderRadius: '1px',
                      cursor: 'pointer',
                    }}
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => onRemovePending(p.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'transparent',
                      border: '1px solid #333',
                      color: '#666',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      borderRadius: '1px',
                      cursor: 'pointer',
                    }}
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <AdminLabel>Testimonials</AdminLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {local.testimonials.map((t, i) => (
            <div key={i} style={{
              background: 'var(--dark3)',
              border: '1px solid var(--dark4)',
              borderRadius: '2px',
              padding: '1.2rem',
            }}>
              <AdminGrid>
                <AdminField label="author" value={t.author} onChange={v => {
                  const arr = [...local.testimonials];
                  arr[i] = { ...arr[i], author: v };
                  set('testimonials', arr);
                }} />
                <AdminField label="role" value={t.role} onChange={v => {
                  const arr = [...local.testimonials];
                  arr[i] = { ...arr[i], role: v };
                  set('testimonials', arr);
                }} />
                <AdminField label="quote" value={t.quote} onChange={v => {
                  const arr = [...local.testimonials];
                  arr[i] = { ...arr[i], quote: v };
                  set('testimonials', arr);
                }} textarea fullWidth />
              </AdminGrid>
              <button
                onClick={() => {
                  const arr = local.testimonials.filter((_, j) => j !== i);
                  set('testimonials', arr);
                }}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.4rem 0.8rem',
                  background: 'transparent',
                  border: '1px solid #333',
                  color: '#666',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  borderRadius: '1px',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const arr = [...local.testimonials, {
                quote: 'Great work!',
                author: 'New Client',
                role: 'Role, Company',
              }];
              set('testimonials', arr);
            }}
            style={{
              padding: '0.8rem',
              background: 'transparent',
              border: '1px dashed var(--dark4)',
              color: '#666',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              borderRadius: '1px',
              cursor: 'pointer',
            }}
          >
            + Add Testimonial
          </button>
        </div>

        {/* Skills */}
        <AdminLabel>Skills</AdminLabel>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: '#555',
          marginBottom: '1rem',
        }}>
          Drag to reorder • Use an emoji or paste an image URL as the icon
        </p>

        <DragList
          items={local.skills}
          onReorder={arr => set('skills', arr)}
          renderItem={(skill, i) => (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              flex: 1,
              flexWrap: 'wrap',
            }}>
              <input
                type="text"
                value={skill.icon}
                onChange={e => {
                  const arr = [...local.skills];
                  arr[i] = { ...arr[i], icon: e.target.value };
                  set('skills', arr);
                }}
                placeholder="emoji or image URL"
                style={{
                  width: '140px',
                  background: 'var(--dark)',
                  border: '1px solid var(--dark4)',
                  color: 'var(--light)',
                  padding: '0.4rem 0.6rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  borderRadius: '1px',
                  outline: 'none',
                }}
              />
              <input
                type="text"
                value={skill.name}
                onChange={e => {
                  const arr = [...local.skills];
                  arr[i] = { ...arr[i], name: e.target.value };
                  set('skills', arr);
                }}
                placeholder="Skill name"
                style={{
                  flex: 1,
                  minWidth: '120px',
                  background: 'var(--dark)',
                  border: '1px solid var(--dark4)',
                  color: 'var(--light)',
                  padding: '0.4rem 0.6rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  borderRadius: '1px',
                  outline: 'none',
                }}
              />
              <button
                onClick={() => {
                  const arr = local.skills.filter((_, j) => j !== i);
                  set('skills', arr);
                }}
                style={{
                  padding: '0.4rem 0.8rem',
                  background: 'transparent',
                  border: '1px solid #333',
                  color: '#666',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  borderRadius: '1px',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                Remove
              </button>
            </div>
          )}
        />

        <button
          onClick={() => {
            const arr = [...local.skills, {
              id: 's' + Date.now(),
              icon: '💡',
              name: 'New Skill',
            }];
            set('skills', arr);
          }}
          style={{
            marginTop: '0.8rem',
            width: '100%',
            padding: '0.8rem',
            background: 'transparent',
            border: '1px dashed var(--dark4)',
            color: '#666',
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            borderRadius: '1px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          + Add Skill
        </button>

{/* Timeline */}
        <AdminLabel>Timeline</AdminLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {(local.timeline || []).map((item, i) => (
            <div key={item.id || i} style={{
              background: 'var(--dark3)',
              border: '1px solid var(--dark4)',
              borderRadius: '2px',
              padding: '1.2rem',
            }}>
              <AdminGrid>
                <AdminField
                  label="Title"
                  value={item.title}
                  onChange={v => {
                    const arr = [...local.timeline];
                    arr[i] = { ...arr[i], title: v };
                    set('timeline', arr);
                  }}
                />
                <AdminField
                  label="Organisation"
                  value={item.organisation}
                  onChange={v => {
                    const arr = [...local.timeline];
                    arr[i] = { ...arr[i], organisation: v };
                    set('timeline', arr);
                  }}
                />
                <AdminField
                  label="Period (e.g. 2022 — Present)"
                  value={item.period}
                  onChange={v => {
                    const arr = [...local.timeline];
                    arr[i] = { ...arr[i], period: v };
                    set('timeline', arr);
                  }}
                />
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: '#666',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.4rem',
                  }}>
                    Type
                  </div>
                  <select
                    value={item.type}
                    onChange={e => {
                      const arr = [...local.timeline];
                      arr[i] = { ...arr[i], type: e.target.value };
                      set('timeline', arr);
                    }}
                    style={{
                      width: '100%',
                      background: 'var(--dark)',
                      border: '1px solid var(--dark4)',
                      color: 'var(--light)',
                      padding: '0.6rem 0.8rem',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.85rem',
                      borderRadius: '1px',
                      outline: 'none',
                    }}
                  >
                    <option value="work">Work</option>
                    <option value="education">Education</option>
                  </select>
                </div>
                <AdminField
                  label="Description"
                  value={item.desc}
                  onChange={v => {
                    const arr = [...local.timeline];
                    arr[i] = { ...arr[i], desc: v };
                    set('timeline', arr);
                  }}
                  textarea
                  fullWidth
                />
              </AdminGrid>
              <button
                onClick={() => {
                  const arr = local.timeline.filter((_, j) => j !== i);
                  set('timeline', arr);
                }}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.4rem 0.8rem',
                  background: 'transparent',
                  border: '1px solid #333',
                  color: '#666',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  borderRadius: '1px',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const arr = [...(local.timeline || []), {
                id: 'tl' + Date.now(),
                type: 'work',
                title: 'New Role',
                organisation: 'Company Name',
                period: '2024 — Present',
                desc: 'Description of your role here.',
              }];
              set('timeline', arr);
            }}
            style={{
              padding: '0.8rem',
              background: 'transparent',
              border: '1px dashed var(--dark4)',
              color: '#666',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              borderRadius: '1px',
              cursor: 'pointer',
            }}
          >
            + Add Timeline Entry
          </button>
        </div>

        {/* Contact */}
        <AdminLabel>Contact Info</AdminLabel>
        <AdminGrid>
          {['email', 'phone', 'location', 'facebook', 'linkedin', 'instagram', 'github'].map(k => (
            <AdminField
              key={k}
              label={k}
              value={local.contact[k]}
              onChange={v => set('contact.' + k, v)}
            />
          ))}
        </AdminGrid>

      </div>

      {/* Save bar */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        background: 'var(--dark2)',
        borderTop: '1px solid var(--dark4)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: saved ? '#4caf50' : '#555',
        }}>
          {saved ? '✓ Changes saved!' : 'Unsaved changes'}
        </span>
        <button
          onClick={handleSave}
          style={{
            padding: '0.75rem 2rem',
            background: 'var(--cr)',
            color: '#fff',
            border: 'none',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            borderRadius: '1px',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          Save and Publish
        </button>
      </div>
    </div>
  );
}

function AdminLabel({ children }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.72rem',
      color: 'var(--cr-light)',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      marginTop: '2.5rem',
      marginBottom: '1rem',
    }}>
      {children}
    </div>
  );
}

function AdminGrid({ children }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginBottom: '1rem',
    }}>
      {children}
    </div>
  );
}

function AdminField({ label, value, onChange, textarea, fullWidth }) {
  const input = textarea ? (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        background: 'var(--dark)',
        border: '1px solid var(--dark4)',
        color: 'var(--light)',
        padding: '0.6rem 0.8rem',
        fontFamily: 'var(--font-display)',
        fontSize: '0.85rem',
        borderRadius: '1px',
        outline: 'none',
        resize: 'vertical',
        minHeight: '80px',
      }}
    />
  ) : (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        background: 'var(--dark)',
        border: '1px solid var(--dark4)',
        color: 'var(--light)',
        padding: '0.6rem 0.8rem',
        fontFamily: 'var(--font-display)',
        fontSize: '0.85rem',
        borderRadius: '1px',
        outline: 'none',
      }}
    />
  );

  return (
    <div style={{ gridColumn: fullWidth ? '1 / -1' : 'auto' }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        color: '#666',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '0.4rem',
      }}>
        {label}
      </div>
      {input}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: '36px',
        height: '20px',
        background: checked ? 'var(--cr)' : 'var(--dark4)',
        borderRadius: '10px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: '3px',
        left: checked ? '17px' : '3px',
        width: '14px',
        height: '14px',
        background: '#fff',
        borderRadius: '50%',
        transition: 'left 0.2s',
      }} />
    </div>
  );
}

function FontOption({ font, selected, onClick, type }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: selected ? 'var(--cr-dim)' : 'var(--dark3)',
        border: '1px solid ' + (selected ? 'var(--cr)' : hovered ? 'var(--cr-dim)' : 'var(--dark4)'),
        borderRadius: '2px',
        padding: '0.8rem 1rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      <div style={{
        fontFamily: type === 'mono' ? "'" + font + "', monospace" : "'" + font + "', sans-serif",
        fontSize: '1rem',
        color: selected ? 'var(--cr-light)' : 'var(--light)',
        marginBottom: '0.3rem',
      }}>
        Aa Bb Cc
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        color: selected ? 'var(--cr-light)' : '#666',
        letterSpacing: '0.08em',
      }}>
        {font}
      </div>
    </div>
  );
}

export default Admin;