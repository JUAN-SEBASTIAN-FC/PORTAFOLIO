import { Link } from 'react-router-dom';
import Stalactites from '../ui/Stalactites';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './About.css';

const TOOLS = [
  'Git', 'GitHub', 'Figma', 'Notion', 'Jira', 'Supabase', 'Docker', 'VS Code'
];

export default function About() {
  const textRef  = useScrollAnimation();
  const statsRef = useScrollAnimation();

  return (
    <section className="about section" id="sobre-mi">
      <Stalactites position="top" count={8} />

      <div className="container">
        <div className="about__inner">
          {/* ── Image side ── */}
          <div className="about__image-col">
            <div className="about__image-frame glass">
              <div className="about__avatar">
                <span className="about__avatar-initials">JSFC</span>
                <div className="about__avatar-ring" aria-hidden="true" />
              </div>
              {/* Social links */}
              <div className="about__socials">
                <a href="https://github.com/JUAN-SEBASTIAN-FC" target="_blank" rel="noopener noreferrer"
                   className="about__social-link" aria-label="GitHub" id="link-github">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/juan-sebastian-falla-ca%C3%B1arte-dev7" target="_blank" rel="noopener noreferrer"
                   className="about__social-link" aria-label="LinkedIn" id="link-linkedin">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:juansebastianfalla7@gmail.com"
                   className="about__social-link" aria-label="Email" id="link-email-about">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Text side ── */}
          <div ref={textRef} className="about__text animate-fade-up">
            <div className="section-header">
              <span className="section-label">Sobre mí</span>
              <h2 className="section-title">Desarrollador apasionado<br />por el detalle</h2>
            </div>

            <p className="about__bio">
              Soy Juan Sebastián Falla Cañarte, desarrollador de software de 18 años
              estudiando en la <strong>Universidad del Valle</strong>, desde Tuluá, Colombia.
            </p>
            <p className="about__bio">
              Me apasiona construir soluciones web funcionales que combinan diseño
              limpio con código bien estructurado. Trabajo con React, Node.js, Python
              y SQL para crear proyectos reales desde cero.
            </p>
            <p className="about__bio">
              Cada proyecto publicado es una oportunidad de aprender algo nuevo y
              aplicarlo de forma concreta. La consistencia y el detalle me definen.
            </p>

            {/* Tools */}
            <div className="about__tools">
              <span className="section-label">Herramientas del día a día</span>
              <div className="about__tools-list">
                {TOOLS.map(tool => (
                  <span key={tool} className="tag">{tool}</span>
                ))}
              </div>
            </div>

            <div className="about__actions">
              <a href="#contacto" className="btn btn-primary about__cta" id="about-cta">
                Hablemos
              </a>
              <Link to="/certificados" className="btn btn-ghost about__cta" style={{ marginLeft: '1rem' }} id="about-cta-certs">
                Ver Certificados
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
