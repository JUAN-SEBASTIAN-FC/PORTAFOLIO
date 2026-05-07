import { useRef, useEffect, useState } from 'react';
import { experiences } from '../../data/experience';
import './Experience.css';

const TYPE_LABELS = {
  'full-time': 'Tiempo completo',
  'freelance':  'Freelance',
  'internship': 'Pasantía',
};

function ExperienceItem({ exp, index }) {
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
            <span className={`exp-type-badge exp-type--${exp.type}`}>
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
            Experiencia <span className="gradient-text">Profesional</span>
          </h2>
          <p className="section-subtitle">
            Años de entrega real, equipos, clientes y decisiones técnicas que definen mi perfil.
          </p>
        </div>

        {/* Timeline */}
        <div className="experience-timeline">
          <div className="timeline-line" aria-hidden="true" />
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
