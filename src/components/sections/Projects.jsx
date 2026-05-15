import { useRef, useEffect } from 'react';
import { projects } from '../../data/projects';
import './Projects.css';

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`project-card glass-panel${project.featured ? ' project-card--featured' : ''}${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Gradient accent */}
      <div className="project-card-accent" />

      {/* Image */}
      {project.image && (
        <div className="project-card-image-wrapper">
          <img src={project.image} alt={project.title} className="project-card-image" loading="lazy" />
        </div>
      )}

      {/* Header */}
      <div className="project-card-header">
        <div className="project-card-meta">
          {project.featured && <span className="project-badge">Destacado</span>}
          <span className="project-year">{project.year}</span>
        </div>
        <div className="project-card-links">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            aria-label={`GitHub — ${project.title}`}
          >
            {/* GitHub icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
          {project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              aria-label={`Demo — ${project.title}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <h3 className="project-title">{project.title}</h3>
      {project.subtitle && (
        <p className="project-subtitle">{project.subtitle}</p>
      )}
      <p className="project-description">{project.description}</p>

      {/* Tags */}
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>
    </article>
  );
}

export default function Projects() {

  return (
    <section id="proyectos" className="projects-section">
      <div className="section-top-border" />

      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Trabajo selecto</span>
          <h2 className="section-title">
            Proyectos <span className="gradient-text">Destacados</span>
          </h2>
          <p className="section-subtitle">
            Una selección de proyectos reales que demuestran dominio técnico, decisiones de arquitectura y entrega de valor.
          </p>
        </div>



        {/* Grid */}
        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="projects-cta">
          <a
            href="https://github.com/JUAN-SEBASTIAN-FC"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Ver todos en GitHub
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
