import PulseIndicator from '../ui/PulseIndicator';
import DragonSequence  from '../ui/DragonSequence';
import Stalactites     from '../ui/Stalactites';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Hero.css';

export default function Hero() {
  const titleRef    = useScrollAnimation();
  const subtitleRef = useScrollAnimation();
  const ctaRef      = useScrollAnimation();

  return (
    <section className="hero section" id="inicio">
      <Stalactites position="top" count={13} />

      <div className="hero__inner container">
        {/* ── Text side ── */}
        <div className="hero__content">
          <div ref={titleRef} className="animate-fade-up">
            <span className="section-label">Portafolio</span>
            <h1 className="hero__name">
              Juan Sebastián<br />
              <span className="text-glow">Vaya Cañarte</span>
            </h1>
          </div>

          <div ref={subtitleRef} className="hero__meta animate-fade-up delay-2">
            <PulseIndicator label="Disponible para trabajo" variant="green" />
            <p className="hero__role">
              Full Stack Developer<br />
              <span className="text-gold">& AI Integrator</span>
            </p>
            <p className="hero__bio">
              Construyo productos digitales con arquitectura limpia, interfaces
              inmersivas y experiencias que marcan la diferencia.
              Especialista en React, Node.js e inteligencia artificial aplicada.
            </p>
          </div>

          <div ref={ctaRef} className="hero__actions animate-fade-up delay-4">
            <a href="#proyectos" className="btn btn-primary" id="hero-cta-projects">
              Ver proyectos
            </a>
            <a href="#contacto" className="btn btn-ghost" id="hero-cta-contact">
              Contactar
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats animate-fade-up delay-4">
            <div className="hero__stat">
              <strong>5+</strong>
              <span>Años de experiencia</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <strong>30+</strong>
              <span>Proyectos entregados</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <strong>15+</strong>
              <span>Tecnologías dominadas</span>
            </div>
          </div>
        </div>

        {/* ── Dragon side ── */}
        <div className="hero__dragon-wrapper">
          <div className="hero__dragon-glow" aria-hidden="true" />
          <DragonSequence />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  );
}
