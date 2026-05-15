import { useRef, useEffect, useState } from 'react';
import { experiences } from '../../data/experience';
import './Experience.css';

const TYPE_LABELS = {
  'education': 'Formación',
  'project':   'Proyecto Autónomo',
};

const TYPE_COLORS = {
  'education': 'education',
  'project':   'freelance',
};

function FormationItem({ exp, index }) {
  const itemRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={itemRef}
      className={`experience-item${isEven ? ' exp-left' : ' exp-right'}${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Timeline dot */}
      <div className="exp-dot">
        <div className="exp-dot-inner" />
      </div>

      {/* Card */}
      <div className="exp-card glass-panel">
        <div className="exp-card-top">
          <div>
            <h3 className="exp-role">{exp.role}</h3>
            <p className="exp-company">
              {exp.company}
              <span className="exp-location"> · {exp.location}</span>
            </p>
          </div>
          <div className="exp-card-right">
            <span className="exp-period">{exp.period}</span>
            <span className={`exp-type-badge exp-type--${TYPE_COLORS[exp.type] || exp.type}`}>
              {TYPE_LABELS[exp.type] || exp.type}
            </span>
          </div>
        </div>

        <p className="exp-description">{exp.description}</p>

        {/* Achievements */}
        <ul className="exp-achievements">
          {exp.achievements.map((a, i) => (
            <li key={i} className="exp-achievement">
              <span className="exp-achievement-dot" aria-hidden="true">▸</span>
              {a}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="exp-tags">
          {exp.tags.map((tag) => (
            <span key={tag} className="exp-tag">{tag}</span>
          ))}
        </div>

        {/* Links for projects */}
        {exp.live && (
          <div className="exp-links">
            <a href={exp.live} target="_blank" rel="noopener noreferrer" className="exp-link exp-link--live">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Ver en vivo
            </a>
            {exp.github && (
              <a href={exp.github} target="_blank" rel="noopener noreferrer" className="exp-link exp-link--github">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experiencia" className="experience-section">
      <div className="section-top-border" />

      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Trayectoria</span>
          <h2 className="section-title">
            Formación & <span className="gradient-text">Proyectos</span>
          </h2>
          <p className="section-subtitle">
            Mi camino académico y los proyectos autónomos que lo acompañan.
          </p>
        </div>

        {/* Timeline */}
        <div className="experience-timeline">
          <div className="timeline-line" aria-hidden="true" />
          {experiences.map((exp, i) => (
            <FormationItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
